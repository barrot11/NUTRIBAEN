import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Logo({
  className = "",
  size = 48,
  color = "#0E7947",
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id="logo-svg"
      role="img"
      aria-label="NutriBaen Logo"
    >
      <g fill={color}>
        {/* N Letterform */}
        {/* Left vertical stem */}
        <path d="M 120 268 H 202 V 488 C 172 494 145 501 120 507 Z" />
        {/* Right vertical stem */}
        <path d="M 412 268 H 494 V 474 C 466 475 439 477 412 481 Z" />
        {/* Diagonal stroke of N */}
        <polygon points="196,268 288,268 494,474 412,481" />

        {/* B Letterform (evenodd for transparent counters) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 510 268
             H 748
             C 810 268 854 296 854 348
             C 854 380 832 400 790 410
             C 848 420 888 444 888 484
             C 888 494 882 502 866 508
             C 812 498 732 486 646 478
             C 600 475 554 474 510 476
             Z
             M 590 316
             H 730
             C 758 316 776 326 776 348
             C 776 368 758 378 730 378
             H 590
             Z
             M 590 414
             H 750
             C 782 414 804 426 804 450
             C 804 466 782 476 750 476
             H 590
             Z"
        />

        {/* Root Network (Arrels de Nutrició) */}
        {/* Organic root base directly under the letters */}
        <path
          d="M 118 510
             C 170 514 260 522 360 514
             C 450 506 540 506 630 514
             C 730 522 820 514 872 510
             C 886 514 864 524 832 530
             C 780 540 710 546 640 554
             C 570 562 520 576 460 576
             C 400 576 350 562 280 554
             C 210 546 140 540 88 530
             C 56 524 104 514 118 510 Z"
        />

        {/* Central taproot */}
        <path
          d="M 482 560
             C 490 600 495 650 500 740
             C 505 765 495 765 500 740
             C 505 650 510 600 518 560
             Z"
        />

        {/* Left main root branches */}
        <path
          d="M 460 570
             C 430 610 390 660 338 710
             C 328 720 334 712 344 700
             C 390 648 424 602 450 568
             Z"
        />
        <path
          d="M 410 576
             C 360 616 300 656 220 630
             C 206 626 216 620 230 622
             C 290 634 340 600 390 566
             Z"
        />
        <path
          d="M 330 560
             C 280 580 210 580 160 560
             C 146 554 154 546 168 550
             C 210 564 270 564 316 548
             Z"
        />

        {/* Right main root branches */}
        <path
          d="M 540 570
             C 570 610 610 660 662 710
             C 672 720 666 712 656 700
             C 610 648 576 602 550 568
             Z"
        />
        <path
          d="M 590 576
             C 640 616 700 656 780 630
             C 794 626 784 620 770 622
             C 710 634 660 600 610 566
             Z"
        />
        <path
          d="M 670 560
             C 720 580 790 580 840 560
             C 854 554 846 546 832 550
             C 790 564 730 564 684 548
             Z"
        />

        {/* Secondary root branches & tendrils */}
        <path
          d="M 485 640
             C 460 670 430 700 400 726
             C 392 732 398 726 406 718
             C 432 694 458 666 480 636
             Z"
        />
        <path
          d="M 515 640
             C 540 670 570 700 600 726
             C 608 732 602 726 594 718
             C 568 694 542 666 520 636
             Z"
        />
        <path
          d="M 440 640
             C 410 670 370 680 320 685
             C 308 686 314 678 326 676
             C 368 670 402 658 430 630
             Z"
        />
        <path
          d="M 560 640
             C 590 670 630 680 680 685
             C 692 686 686 678 674 676
             C 632 670 598 658 570 630
             Z"
        />
        <path
          d="M 280 600
             C 240 620 200 640 180 670
             C 174 678 178 672 186 662
             C 204 638 238 620 272 600
             Z"
        />
        <path
          d="M 720 600
             C 760 620 800 640 820 670
             C 826 678 822 672 814 662
             C 796 638 762 620 728 600
             Z"
        />
      </g>
    </svg>
  );
}
