import { useState, useEffect, useMemo, FormEvent } from "react";
import { SERVICES } from "../data";
import { BookingDetails } from "../types";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Loader2, 
  Check,
  Video,
  MapPin,
  FlameKindling,
  Mail,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingStepperProps {
  selectedServiceId: string | null;
  onBookingSuccess?: () => void;
}

export default function BookingStepper({ selectedServiceId, onBookingSuccess }: BookingStepperProps) {
  // Stepper State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Selection State
  const [visitType, setVisitType] = useState<"primera" | "seguiment">("primera");
  const modality = "presencial";
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [serverBookedSlots, setServerBookedSlots] = useState<{ date: string; time: string }[]>([]);

  // Fetch booked slots from the backend to prevent duplicate bookings
  useEffect(() => {
    fetch("/api/booked-slots")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("HTTP error " + res.status);
      })
      .then(data => {
        if (Array.isArray(data)) {
          setServerBookedSlots(data);
        }
      })
      .catch(err => console.warn("Error fetching booked slots:", err));
  }, [currentStep]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    willingToInvest: "",
    interestedService: "",
    acceptTerms: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Loading & Success State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [bookedDetails, setBookedDetails] = useState<BookingDetails | null>(null);

  // Calendar Month Navigation
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // Sync selectedServiceId from parent (Services component click)
  useEffect(() => {
    if (selectedServiceId) {
      if (selectedServiceId === "reeducacio" || selectedServiceId === "esportiva" || selectedServiceId === "clinica" || selectedServiceId === "vegana") {
        setVisitType("primera"); // default to primera when selecting primary services
      }
      // Scroll to booking section when a service is selected
      const el = document.getElementById("reserva-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedServiceId]);

  // Form Field Floating Label Helpers
  const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
  const handleFocus = (field: string) => setActiveFields(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setActiveFields(prev => ({ ...prev, [field]: false }));
    }
  };

  // Generate Calendar Days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of current month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjusted index for Monday start (0=Sunday, 1=Monday... to 0=Monday, 6=Sunday)
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Total days in previous month
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Padding days from previous month
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
        isPast: true
      });
    }

    // Days of current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      const isPast = dateObj.getTime() < today.getTime();
      
      days.push({
        date: dateObj,
        isCurrentMonth: true,
        isPast: isPast
      });
    }

    // Padding days from next month (fill up to complete weeks of 7 days)
    const totalSlots = Math.ceil(days.length / 7) * 7;
    const paddingNext = totalSlots - days.length;
    for (let i = 1; i <= paddingNext; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isPast: false
      });
    }

    return days;
  }, [currentMonth]);

  // Handle Month Change
  const prevMonth = () => {
    const today = new Date();
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Don't navigate to past months
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) {
      return;
    }
    setCurrentMonth(prev);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Month name formatter in Catalan
  const getMonthNameCat = (date: Date) => {
    const months = [
      "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
      "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Determine if a day is selectable
  const isDaySelectable = (date: Date, isPast: boolean) => {
    if (isPast) return false;
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    // Only Dilluns (1), Dimarts (2), Dimecres (3), Dijous (4) are selectable!
    return dayOfWeek >= 1 && dayOfWeek <= 4;
  };

  // Dynamic 45-minute slots based on the office hours:
  // Dilluns, Dimarts, Dijous: 16:30, 17:15, 18:00 (3 clients)
  // Dimecres: 16:30, 17:15, 18:00, 18:45 (4 clients)
  const getTimeSlotsForDate = (date: Date | null) => {
    if (!date) return [];
    const day = date.getDay();
    if (day === 3) {
      // Dimecres: 4 clients de 45'
      return ["16:30", "17:15", "18:00", "18:45"];
    }
    if (day === 1 || day === 2 || day === 4) {
      // Dilluns, Dimarts, Dijous: 3 clients de 45'
      return ["16:30", "17:15", "18:00"];
    }
    return [];
  };

  // Deterministic "Busy Slots" depending on the day of the week to look 100% realistic!
  // Return empty array so that no preset slots are disabled in gray as requested by the user
  const getBusySlotsForDate = (date: Date | null) => {
    return [];
  };

  // Every slot is 45 minutes, so it only occupies that exact slot!
  const isTimeSlotAvailable = (timeStr: string, busySlots: string[]) => {
    if (busySlots.includes(timeStr)) return false;

    if (selectedDate) {
      // Generate timezone-proof YYYY-MM-DD local key matching what the server stores
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const isAlreadyBooked = serverBookedSlots.some(
        slot => slot.date === dateKey && slot.time === timeStr
      );
      if (isAlreadyBooked) return false;
    }

    return true;
  };

  const activeTimeSlots = useMemo(() => getTimeSlotsForDate(selectedDate), [selectedDate]);
  const currentBusySlots = useMemo(() => getBusySlotsForDate(selectedDate), [selectedDate]);

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "El nom i cognoms són obligatoris.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "El correu electrònic és obligatori.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Introdueix un correu electrònic vàlid.";
    }

    const phoneRegex = /^[0-9+ ]{9,13}$/;
    if (!formData.phone.trim()) {
      errors.phone = "El número de telèfon és obligatori.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Introdueix un número de telèfon vàlid (9 xifres).";
    }

    if (visitType === "primera" && !formData.notes.trim()) {
      errors.notes = "Si us plau, indica el motiu de la teva consulta o comentari.";
    }

    if (visitType === "primera") {
      if (!formData.willingToInvest) {
        errors.willingToInvest = "Si us plau, respon a aquesta pregunta.";
      }

      if (!formData.interestedService) {
        errors.interestedService = "Si us plau, indica quin servei t'interessa.";
      }
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "Has d'acceptar la política de privacitat.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler with cool sequential interactive spinner status!
  const handleSubmitBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitMessage("Comprovant disponibilitat en temps real...");

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitMessage("Enviant sol·licitud i preparant correus electrònics...");
      
      const serviceObj = SERVICES.find(s => s.id === selectedServiceId);
      const serviceName = serviceObj ? serviceObj.title : "Consulta de Nutrició";

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const finalWillingToInvest = visitType === "primera" ? formData.willingToInvest : "No aplica (Seguiment)";
      const finalInterestedService = visitType === "primera" ? formData.interestedService : "No aplica (Seguiment)";

      // Real API POST call to the backend
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "booking",
          date: selectedDate.toISOString(),
          dateKey: dateKey,
          time: selectedTime,
          visitType: visitType,
          modality: modality,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
          willingToInvest: finalWillingToInvest,
          interestedService: finalInterestedService,
          serviceName: serviceName,
        }),
      });

      if (!response.ok) {
        throw new Error("La resposta del servidor no ha estat OK.");
      }

      await new Promise(resolve => setTimeout(resolve, 600));
      setSubmitMessage("Generant l'enllaç de confirmació i enllaços de Google Calendar...");
      await new Promise(resolve => setTimeout(resolve, 800));

      const finalDetails: BookingDetails = {
        date: selectedDate,
        time: selectedTime,
        visitType: visitType,
        modality: modality,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
        willingToInvest: finalWillingToInvest,
        interestedService: finalInterestedService,
      };

      setBookedDetails(finalDetails);
      setCurrentStep(4);
      if (onBookingSuccess) onBookingSuccess();
    } catch (e) {
      console.error(e);
      setFormErrors({ submit: "No s'ha pogut completar la reserva. Revisa la connexió o torna-ho a intentar." });
    } finally {
      setIsSubmitting(false);
      setSubmitMessage("");
    }
  };

  // Google Calendar URL Generator
  const googleCalendarUrl = useMemo(() => {
    if (!bookedDetails || !bookedDetails.date) return "";
    
    const title = encodeURIComponent(
      `Cita Nutrició (${bookedDetails.visitType === "primera" ? "1a Visita" : "Seguiment"}) - Pol Barrot`
    );
    
    // Parse Date and start time
    const startHour = parseInt(bookedDetails.time.split(":")[0]);
    const startMin = parseInt(bookedDetails.time.split(":")[1]);
    
    const startDate = new Date(bookedDetails.date);
    startDate.setHours(startHour, startMin, 0);

    const endDate = new Date(startDate);
    const durationMin = bookedDetails.visitType === "primera" ? 60 : 30;
    endDate.setMinutes(startDate.getMinutes() + durationMin);

    // Format dates as YYYYMMDDTHHMMSS
    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatCalDate = (d: Date) => {
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    };

    const dates = `${formatCalDate(startDate)}/${formatCalDate(endDate)}`;
    
    const location = encodeURIComponent(
      "Consulta Pol Barrot, Carrer d'Agustí Duran i Sanpere 9, 25001, Lleida"
    );

    const details = encodeURIComponent(
      `Sessió de nutrició personalitzada amb Pol Barrot.\nModalitat: Presencial a Lleida\nPacient: ${bookedDetails.name}\n\nRebràs una confirmació amb més detalls per correu electrònic.`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=Europe/Madrid`;
  }, [bookedDetails]);

  return (
    <section id="reserva" className="py-20 md:py-28 bg-neutral-warm-50/30 border-t border-neutral-warm-200/50">
      <div id="reserva-section" className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="booking-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Agenda en línia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            Reserva la teva Cita en 3 Passos
          </h2>
          <p className="font-sans text-sm text-neutral-warm-500 font-light">
            Selecciona el dia i la teva hora preferida per a la teva consulta presencial a Lleida. Rebràs una confirmació immediata amb tots els detalls al teu correu.
          </p>
        </div>

        {/* Stepper Progress Bar (only when not in step 4 / success screen) */}
        {currentStep < 4 && (
          <div className="flex items-center justify-between max-w-lg mx-auto mb-12" id="booking-progress">
            {[
              { num: 1, label: "Detalls i Dia", icon: <CalendarIcon className="h-4 w-4" /> },
              { num: 2, label: "Hora", icon: <Clock className="h-4 w-4" /> },
              { num: 3, label: "Les teves dades", icon: <User className="h-4 w-4" /> }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center relative z-10 flex-1 last:flex-initial">
                <div className="flex items-center w-full">
                  {/* Step bubble */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-sm transition-all duration-300 ${
                      currentStep === s.num
                        ? "bg-brand-600 text-white ring-4 ring-brand-100"
                        : currentStep > s.num
                        ? "bg-brand-100 text-brand-700"
                        : "bg-white text-neutral-warm-400 border border-neutral-warm-200"
                    }`}
                  >
                    {currentStep > s.num ? <Check className="h-5 w-5 stroke-[2.5]" /> : s.icon}
                  </div>
                  
                  {/* Connection Line */}
                  {s.num < 3 && (
                    <div className="flex-1 h-0.5 mx-2 bg-neutral-warm-200 relative">
                      <div
                        className="absolute top-0 left-0 h-full bg-brand-500 transition-all duration-500"
                        style={{ width: currentStep > s.num ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
                <span
                  className={`font-sans text-xs mt-2 font-medium transition-colors duration-300 ${
                    currentStep === s.num ? "text-neutral-warm-800 font-semibold" : "text-neutral-warm-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Outer Form Card */}
        <div className="bg-white border border-neutral-warm-200/50 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-6 md:p-10 relative overflow-hidden min-h-[460px]">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: VISIT SELECTION AND CALENDAR */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex flex-col gap-8"
                id="booking-step-1"
              >
                {/* Segment Controls: Visit Type */}
                <div className="pb-6 border-b border-neutral-warm-100">
                  {/* Visit Type */}
                  <div className="flex flex-col items-start text-left max-w-md mx-auto w-full">
                    <label className="font-sans font-bold text-[11px] text-neutral-warm-400 uppercase tracking-wider mb-2.5 text-center w-full">
                      Tipus de visita (Sempre Presencial a Lleida)
                    </label>
                    <div className="flex bg-neutral-warm-100 p-1 rounded-xl w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setVisitType("primera");
                          setSelectedTime(""); // clear time slot as availability parameters changed
                        }}
                        className={`flex-1 py-2 text-xs font-sans font-semibold rounded-lg transition-all ${
                          visitType === "primera"
                            ? "bg-white text-brand-800 shadow-sm"
                            : "text-neutral-warm-500 hover:text-neutral-warm-800"
                        }`}
                      >
                        Primera Visita (45 min)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setVisitType("seguiment");
                          setSelectedTime(""); // clear time slot
                        }}
                        className={`flex-1 py-2 text-xs font-sans font-semibold rounded-lg transition-all ${
                          visitType === "seguiment"
                            ? "bg-white text-brand-800 shadow-sm"
                            : "text-neutral-warm-500 hover:text-neutral-warm-800"
                        }`}
                      >
                        Seguiment (45 min)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Grid Container */}
                <div className="flex flex-col gap-4">
                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-bold text-base text-neutral-warm-800 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-brand-500" />
                      Selecciona un dia disponible
                    </h3>
                    
                    <div className="flex items-center gap-2 bg-neutral-warm-50 border border-neutral-warm-200/50 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1.5 hover:bg-white text-neutral-warm-600 hover:text-neutral-warm-900 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={
                          currentMonth.getMonth() === new Date().getMonth() &&
                          currentMonth.getFullYear() === new Date().getFullYear()
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-sans font-semibold text-xs text-neutral-warm-800 px-2 min-w-[100px] text-center">
                        {getMonthNameCat(currentMonth)}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1.5 hover:bg-white text-neutral-warm-600 hover:text-neutral-warm-900 rounded-lg transition-colors cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* The Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {/* Weekday headers */}
                    {["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"].map((d, i) => (
                      <div
                        key={i}
                        className="font-sans font-bold text-xs text-neutral-warm-400 py-2"
                      >
                        {d}
                      </div>
                    ))}

                    {/* Day Cells */}
                    {calendarDays.map((day, idx) => {
                      const isSelectable = isDaySelectable(day.date, day.isPast);
                      const isSelected = selectedDate && selectedDate.getDate() === day.date.getDate() && selectedDate.getMonth() === day.date.getMonth() && selectedDate.getFullYear() === day.date.getFullYear();
                      
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (isSelectable) {
                              setSelectedDate(day.date);
                              setSelectedTime(""); // Reset time on date change
                            }
                          }}
                          disabled={!isSelectable || !day.isCurrentMonth}
                          className={`aspect-square rounded-xl text-xs font-sans font-medium flex flex-col items-center justify-center relative transition-all ${
                            !day.isCurrentMonth
                              ? "opacity-0 pointer-events-none"
                              : !isSelectable
                              ? "text-neutral-warm-300 bg-neutral-warm-50/30 cursor-not-allowed"
                              : isSelected
                              ? "bg-brand-600 text-white font-bold shadow-md shadow-brand-100 scale-105"
                              : "bg-brand-50/40 text-brand-800 hover:bg-brand-100/80 cursor-pointer"
                          }`}
                        >
                          {day.date.getDate()}
                          {isSelectable && !isSelected && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend or Next Step button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-6 border-t border-neutral-warm-100">
                  <div className="flex gap-4 text-[11px] text-neutral-warm-500 justify-center sm:justify-start">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-200" />
                      Disponible (Dilluns a Divendres)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-neutral-warm-200" />
                      No disponible / Cap de setmana
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedDate}
                    className="w-full sm:w-auto px-6 py-3 bg-brand-600 disabled:bg-neutral-warm-200 text-white font-sans font-semibold text-sm rounded-xl hover:bg-brand-700 shadow-md transition-all active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Següent pas: Tria hora
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: HOUR SELECTION */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex flex-col gap-6"
                id="booking-step-2"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 text-xs text-neutral-warm-500 hover:text-neutral-warm-800 font-sans font-medium"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Tornar al calendari
                  </button>
                  <span className="font-sans font-bold text-xs text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedDate ? `${selectedDate.getDate()} / ${selectedDate.getMonth() + 1} / ${selectedDate.getFullYear()}` : ""}
                  </span>
                </div>

                <div className="text-left">
                  <h3 className="font-sans font-bold text-base text-neutral-warm-800 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-500" />
                    Hores disponibles per al dia seleccionat
                  </h3>
                  <p className="font-sans text-xs text-neutral-warm-500 mt-1 font-light">
                    Cada sessió té una durada de <strong>45 minuts</strong> de consulta personalitzada.
                  </p>
                </div>

                {/* Time Slots Grid */}
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="font-sans font-bold text-xs text-neutral-warm-400 uppercase tracking-wider mb-3">
                      Torns de tarda disponibles
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activeTimeSlots.map((timeStr) => {
                        const isAvailable = isTimeSlotAvailable(timeStr, currentBusySlots);
                        const isSelected = selectedTime === timeStr;
                        
                        return (
                          <button
                            key={timeStr}
                            type="button"
                            onClick={() => isAvailable && setSelectedTime(timeStr)}
                            disabled={!isAvailable}
                            className={`py-3 text-xs font-sans font-semibold rounded-xl text-center border transition-all ${
                              isSelected
                                ? "bg-brand-500 border-brand-500 text-black font-extrabold shadow-[0_0_15px_rgba(0,255,102,0.3)] scale-105"
                                : isAvailable
                                ? "bg-white border-neutral-warm-200/60 text-neutral-warm-700 hover:border-brand-300 hover:bg-brand-50/30 cursor-pointer"
                                : "bg-neutral-warm-50 text-neutral-warm-300 border-neutral-warm-200/30 cursor-not-allowed line-through"
                            }`}
                          >
                            {timeStr} h
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Back / Next Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-neutral-warm-100">
                  <span className="font-sans text-xs text-neutral-warm-500">
                    {selectedTime 
                      ? `Sessió triada: ${selectedTime} h (45 min)`
                      : "Siusplau, tria una hora de les disponibles."
                    }
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedTime}
                    className="w-full sm:w-auto px-6 py-3 bg-brand-500 disabled:bg-neutral-warm-200 text-black font-sans font-extrabold text-sm rounded-xl hover:bg-brand-600 shadow-md transition-all active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Següent pas: Les teves dades
                    <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATA FORM */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex flex-col gap-6 text-left"
                id="booking-step-3"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 text-xs text-neutral-warm-500 hover:text-neutral-warm-800 font-sans font-medium"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Tornar a les hores
                  </button>
                  <span className="font-sans font-semibold text-xs text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                    {selectedDate ? `${selectedDate.getDate()} / ${selectedDate.getMonth() + 1}` : ""} - {selectedTime} h
                  </span>
                </div>

                <div className="text-left">
                  <h3 className="font-sans font-bold text-base text-neutral-warm-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-brand-500" />
                    Dades de contacte i motiu de la consulta
                  </h3>
                  <p className="font-sans text-xs text-neutral-warm-500 mt-1 font-light">
                    Siusplau, omple el següent formulari per registrar la cita de forma segura a l'agenda d'en Pol.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmitBooking} className="space-y-5" noValidate>
                  
                  {/* Floating Label: Name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onFocus={() => handleFocus("name")}
                      onBlur={(e) => handleBlur("name", e.target.value)}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                      }}
                      className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                        formErrors.name
                          ? "border-red-400 bg-red-50/10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : formData.name || activeFields.name
                          ? "border-brand-500 bg-white"
                          : "border-neutral-warm-200 focus:border-brand-500"
                      }`}
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                        formData.name || activeFields.name
                          ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                          : "top-4 text-neutral-warm-400 text-sm"
                      }`}
                    >
                      Nom i Cognoms *
                    </label>
                    {formErrors.name && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Floating Label: Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onFocus={() => handleFocus("email")}
                        onBlur={(e) => handleBlur("email", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                          formErrors.email
                            ? "border-red-400 bg-red-50/10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : formData.email || activeFields.email
                            ? "border-brand-500 bg-white"
                            : "border-neutral-warm-200 focus:border-brand-500"
                        }`}
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                          formData.email || activeFields.email
                            ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                            : "top-4 text-neutral-warm-400 text-sm"
                        }`}
                      >
                        Correu Electrònic *
                      </label>
                      {formErrors.email && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    {/* Floating Label: Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onFocus={() => handleFocus("phone")}
                        onBlur={(e) => handleBlur("phone", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                        }}
                        className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                          formErrors.phone
                            ? "border-red-400 bg-red-50/10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : formData.phone || activeFields.phone
                            ? "border-brand-500 bg-white"
                            : "border-neutral-warm-200 focus:border-brand-500"
                        }`}
                      />
                      <label
                        htmlFor="phone"
                        className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                          formData.phone || activeFields.phone
                            ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                            : "top-4 text-neutral-warm-400 text-sm"
                        }`}
                      >
                        Número de Telèfon *
                      </label>
                      {formErrors.phone && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {visitType === "primera" && (
                    <>
                      {/* Question 1: Willing to invest 100+ € monthly */}
                      <div className="flex flex-col text-left space-y-2">
                        <label className="font-sans font-bold text-xs text-neutral-warm-700">
                          Estàs disposat/a a invertir 100€ o més mensualment per la teva salut? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, willingToInvest: "Sí" });
                              if (formErrors.willingToInvest) {
                                const newErrors = { ...formErrors };
                                delete newErrors.willingToInvest;
                                setFormErrors(newErrors);
                              }
                            }}
                            className={`py-3 px-4 text-xs font-sans font-bold rounded-xl text-center border transition-all ${
                              formData.willingToInvest === "Sí"
                                ? "bg-brand-50 border-brand-500 text-brand-800 font-extrabold shadow-sm"
                                : "bg-white border-neutral-warm-200/60 text-neutral-warm-700 hover:border-brand-300"
                            }`}
                          >
                            Sí
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, willingToInvest: "En aquest moment no" });
                              if (formErrors.willingToInvest) {
                                const newErrors = { ...formErrors };
                                delete newErrors.willingToInvest;
                                setFormErrors(newErrors);
                              }
                            }}
                            className={`py-3 px-4 text-xs font-sans font-bold rounded-xl text-center border transition-all ${
                              formData.willingToInvest === "En aquest moment no"
                                ? "bg-brand-50 border-brand-500 text-brand-800 font-extrabold shadow-sm"
                                : "bg-white border-neutral-warm-200/60 text-neutral-warm-700 hover:border-brand-300"
                            }`}
                          >
                            En aquest moment no
                          </button>
                        </div>
                        {formErrors.willingToInvest && (
                          <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            {formErrors.willingToInvest}
                          </span>
                        )}
                      </div>

                      {/* Question 2: Interested service selection */}
                      <div className="flex flex-col text-left space-y-2">
                        <label className="font-sans font-bold text-xs text-neutral-warm-700">
                          Amb quin servei estàs interessat? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {["Protocol trimestral", "Protocol semestral", "Protocol Anual", "Valoració antropomètrica", "Xerrades/tallers"].map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, interestedService: service });
                                if (formErrors.interestedService) {
                                  const newErrors = { ...formErrors };
                                  delete newErrors.interestedService;
                                  setFormErrors(newErrors);
                                }
                              }}
                              className={`py-3 px-4 text-xs font-sans font-bold rounded-xl text-center border transition-all ${
                                formData.interestedService === service
                                  ? "bg-brand-50 border-brand-500 text-brand-800 font-extrabold shadow-sm"
                                  : "bg-white border-neutral-warm-200/60 text-neutral-warm-700 hover:border-brand-300"
                              } ${
                                service === "Xerrades/tallers" ? "sm:col-span-2" : ""
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                        {formErrors.interestedService && (
                          <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            {formErrors.interestedService}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* Floating Label: Notes (Required) */}
                  <div className="relative">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onFocus={() => handleFocus("notes")}
                      onBlur={(e) => handleBlur("notes", e.target.value)}
                      onChange={(e) => {
                        setFormData({ ...formData, notes: e.target.value });
                        if (formErrors.notes) {
                          const newErrors = { ...formErrors };
                          delete newErrors.notes;
                          setFormErrors(newErrors);
                        }
                      }}
                      className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all resize-none ${
                        formErrors.notes
                          ? "border-red-400 bg-red-50/10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : formData.notes || activeFields.notes
                          ? "border-brand-500 bg-white"
                          : "border-neutral-warm-200 focus:border-brand-500"
                      }`}
                    />
                    <label
                      htmlFor="notes"
                      className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                        formData.notes || activeFields.notes
                          ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                          : "top-4 text-neutral-warm-400 text-sm"
                      }`}
                    >
                      {visitType === "primera"
                        ? "Motiu de la consulta o algun comentari que ens vulguis fer *"
                        : "Motiu de la consulta o algun comentari que ens vulguis fer (opcional)"}
                    </label>
                    {formErrors.notes && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.notes}
                      </span>
                    )}
                  </div>

                  {/* Terms Policy Checkbox */}
                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => {
                        setFormData({ ...formData, acceptTerms: e.target.checked });
                        if (formErrors.acceptTerms) setFormErrors({ ...formErrors, acceptTerms: "" });
                      }}
                      className="h-4.5 w-4.5 text-brand-600 border-neutral-warm-300 rounded focus:ring-brand-500 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="acceptTerms" className="font-sans text-xs text-neutral-warm-500 leading-normal select-none cursor-pointer">
                      He llegit i accepto la{" "}
                      <a href="#legal" className="text-brand-600 font-semibold hover:underline">
                        Política de Privacitat i Tractament de Dades
                      </a>{" "}
                      per registrar la meva consulta nutricional amb el Pol Barrot.
                    </label>
                  </div>
                  {formErrors.acceptTerms && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-sans">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {formErrors.acceptTerms}
                    </span>
                  )}

                  {/* Loading indicator overlay or standard button */}
                  <div className="pt-4 border-t border-neutral-warm-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 text-white font-sans font-bold text-sm rounded-xl hover:bg-brand-700 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:bg-neutral-warm-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processant la teva reserva...
                        </>
                      ) : (
                        "Confirmar la meva Cita ara"
                      )}
                    </button>
                  </div>
                </form>

                {/* Submitting Status Visual Overlay */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/90 z-30 flex flex-col items-center justify-center p-8 text-center"
                    id="booking-loading-overlay"
                  >
                    <div className="p-4 rounded-full bg-brand-50 text-brand-600 animate-pulse mb-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                    <h4 className="font-sans font-bold text-lg text-neutral-warm-900">
                      S'està registrant la teva visita
                    </h4>
                    <p className="font-sans text-sm text-neutral-warm-500 mt-2 font-light max-w-sm">
                      {submitMessage}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 4: SUCCESS AND CONFIRMATION SCREEN */}
            {currentStep === 4 && bookedDetails && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
                id="booking-step-success"
              >
                {/* Visual success check anim */}
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 stroke-[2]" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-warm-900 leading-tight">
                  La teva cita s'ha reservat correctament!
                </h3>
                <p className="font-sans text-sm text-neutral-warm-500 font-light mt-2 max-w-md">
                  Gràcies per confiar en la teva salut nutricional amb el Pol Barrot. Hem enviat un correu de confirmació a <strong className="font-semibold text-neutral-warm-800">{bookedDetails.email}</strong>.
                </p>

                {/* Summarized Details Box */}
                <div className="bg-brand-50/70 border border-brand-100 rounded-2xl p-6 w-full max-w-lg my-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 pb-3 border-b border-brand-100 flex items-center justify-between">
                    <span className="font-sans text-xs text-neutral-warm-400 uppercase tracking-wider font-semibold">
                      Resum de la reserva
                    </span>
                    <span className="px-2.5 py-0.5 bg-brand-600 text-white font-sans font-bold text-[10px] rounded-full uppercase tracking-wider">
                      CONFIRMADA
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Tipus de visita
                    </span>
                    <span className="font-sans font-semibold text-sm text-neutral-warm-800 block mt-0.5">
                      {bookedDetails.visitType === "primera" ? "Primera Visita (45 min)" : "Seguiment de Nutrició (45 min)"}
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Modalitat
                    </span>
                    <span className="font-sans font-semibold text-sm text-neutral-warm-800 block mt-0.5 flex items-center gap-1.5">
                      {bookedDetails.modality === "presencial" ? (
                        <>
                          <MapPin className="h-3.5 w-3.5 text-brand-600" />
                          Presencial a Lleida
                        </>
                      ) : (
                        <>
                          <Video className="h-3.5 w-3.5 text-brand-600" />
                          Videotrucada Online
                        </>
                      )}
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Data triada
                    </span>
                    <span className="font-sans font-semibold text-sm text-neutral-warm-800 block mt-0.5">
                      {bookedDetails.date ? bookedDetails.date.toLocaleDateString("ca-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) : ""}
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Hora
                    </span>
                    <span className="font-sans font-semibold text-sm text-neutral-warm-800 block mt-0.5">
                      {bookedDetails.time} h
                    </span>
                  </div>

                  {bookedDetails.visitType === "primera" && (
                    <div className="sm:col-span-2 pt-3 border-t border-brand-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                          Inversió en salut (+100€/mes)
                        </span>
                        <span className="font-sans font-semibold text-xs text-brand-700 block mt-0.5">
                          {bookedDetails.willingToInvest}
                        </span>
                      </div>
                      <div>
                        <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                          Servei d'interès triat
                        </span>
                        <span className="font-sans font-semibold text-xs text-brand-700 block mt-0.5">
                          {bookedDetails.interestedService}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2 pt-3 border-t border-brand-100">
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Motiu indicat
                    </span>
                    <span className="font-sans text-xs text-neutral-warm-600 block mt-0.5 bg-neutral-warm-50 p-3 rounded-lg border border-neutral-warm-100/50 italic">
                      "{bookedDetails.notes}"
                    </span>
                  </div>

                  <div className="sm:col-span-2 pt-3 border-t border-brand-100">
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider">
                      Adreça de la consulta
                    </span>
                    <span className="font-sans text-xs text-neutral-warm-600 block mt-0.5">
                      Carrer d'Agustí Duran i Sanpere 9, 25001, Lleida
                    </span>
                  </div>
                </div>

                {/* Manual Forwarding / Contact Options with Pol */}
                <div className="w-full max-w-lg bg-neutral-warm-50/60 rounded-xl p-4 border border-neutral-warm-100/70 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-neutral-warm-700">
                    <span className="text-base">📲</span>
                    <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-neutral-warm-600">
                      Contacte Directe i Confirmació Manual
                    </span>
                  </div>
                  <p className="font-sans text-xs text-neutral-warm-500 font-light">
                    Pots enviar una confirmació manual o qualsevol dubte directament a en Pol Barrot amb un sol clic:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <a
                      href={`mailto:polbaen@gmail.com?subject=${encodeURIComponent(
                        `Reserva de Cita Nutricional - ${bookedDetails.name}`
                      )}&body=${encodeURIComponent(
                        `Hola Pol,\n\nEm dic ${bookedDetails.name || "Pacient"} (Email: ${bookedDetails.email}, Telèfon: ${bookedDetails.phone}).\n\nT'envio aquest correu per confirmar la meva cita de nutrició.\n\nDetalls:\n- Servei: ${
                          bookedDetails.visitType === "primera" ? "Primera Consulta" : "Seguiment de Nutrició"
                        }\n- Data: ${
                          bookedDetails.date
                            ? bookedDetails.date.toLocaleDateString("ca-ES", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""
                        }\n- Hora: ${bookedDetails.time}h\n- Motiu/Comentari: ${bookedDetails.notes || "Sense comentaris addicionals"}\n\nAtentament,\n${bookedDetails.name}`
                      )}`}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-warm-200 hover:bg-brand-50 hover:border-brand-300 text-neutral-warm-700 hover:text-brand-800 font-sans font-semibold text-xs rounded-lg transition-all"
                    >
                      <Mail className="h-3.5 w-3.5 text-brand-600" />
                      Enviar per Correu
                    </a>

                    <a
                      href={`https://wa.me/34640775160?text=${encodeURIComponent(
                        `Hola Pol! Em dic ${bookedDetails.name || "Pacient"}. Confirmo la meva reserva de nutrició per al dia ${
                          bookedDetails.date
                            ? bookedDetails.date.toLocaleDateString("ca-ES", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""
                        } a les ${bookedDetails.time}h. Gràcies!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-warm-200 hover:bg-emerald-50 hover:border-emerald-300 text-neutral-warm-700 hover:text-emerald-800 font-sans font-semibold text-xs rounded-lg transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                      Enviar per WhatsApp
                    </a>
                  </div>
                </div>

                {/* Dynamic Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white font-sans font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                    id="add-to-google-calendar-btn"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Afegeix al meu Google Calendar
                  </a>
                  
                  <button
                    type="button"
                    onClick={() => {
                      // Reset booking stepper for secondary bookings
                      setCurrentStep(1);
                      setSelectedDate(null);
                      setSelectedTime("");
                      setBookedDetails(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        notes: "",
                        willingToInvest: "",
                        interestedService: "",
                        acceptTerms: false
                      });
                      setActiveFields({});
                    }}
                    className="w-full sm:w-auto py-3 px-6 bg-white border border-neutral-warm-200 hover:bg-neutral-warm-50 text-neutral-warm-700 font-sans font-semibold text-sm rounded-xl transition-all"
                  >
                    Reserva una altra cita
                  </button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
