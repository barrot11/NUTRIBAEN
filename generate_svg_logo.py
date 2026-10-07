import re

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <defs>
    <!-- In case needed -->
  </defs>
  <g fill="currentColor" class="text-brand-500" style="color: #0E7947;">
    <!-- NB MONOGRAM -->
    <!-- N -->
    <path d="M 118 266 L 200 266 L 200 488 C 172 494 144 501 118 506 Z" />
    <path d="M 412 266 L 492 266 L 492 474 C 466 475 439 477 412 481 Z" />
    <polygon points="194,266 288,266 492,474 412,481" />
    
    <!-- B (using evenodd for clean transparency through the bowls) -->
    <path fill-rule="evenodd" d="
      M 508 266 
      L 745 266 
      C 808 266 852 294 852 346 
      C 852 378 830 398 788 408 
      C 844 418 884 442 884 482 
      C 884 492 878 500 862 506 
      C 810 496 730 484 645 476 
      C 600 473 552 473 508 474 
      Z 
      M 588 316 
      L 728 316 
      C 756 316 774 326 774 346 
      C 774 366 756 376 728 376 
      L 588 376 
      Z 
      M 588 412 
      L 746 412 
      C 778 412 800 424 800 448 
      C 800 464 778 474 746 474 
      L 588 474 
      Z" />

    <!-- ORGANIC ROOT SYSTEM (ARRELS) -->
    <!-- The Root Network beneath the letters -->
    <path d="
      M 118 508
      C 150 514 186 528 214 544
      C 220 548 214 554 204 554
      C 180 550 166 540 148 528
      C 134 520 122 514 118 508 Z
      
      M 166 548
      C 202 566 238 584 274 584
      C 264 594 250 600 236 600
      C 204 590 178 572 166 548 Z
      
      M 218 588
      C 254 606 288 626 318 644
      C 306 652 292 654 278 650
      C 250 638 230 616 218 588 Z
      
      M 278 638
      C 310 658 340 678 372 696
      C 358 704 344 706 330 700
      C 304 686 288 664 278 638 Z
      
      M 334 686
      C 370 706 406 726 442 742
      C 434 748 422 750 412 748
      C 380 736 352 714 334 686 Z
    " />

    <!-- Main spreading root body with organic cutouts -->
    <path fill-rule="evenodd" d="
      M 120 516
      C 170 512 250 496 360 488
      C 470 482 530 482 640 488
      C 750 496 830 512 880 516
      C 850 522 810 528 770 534
      C 730 540 680 544 640 550
      C 590 556 550 564 500 574
      C 450 564 410 556 360 550
      C 320 544 270 540 230 534
      C 190 528 150 522 120 516 Z
    " />
  </g>
</svg>'''

with open('/tmp/test_logo_draft.svg', 'w') as f:
    f.write(svg_content)
print("Draft SVG written successfully")
