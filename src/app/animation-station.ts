import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationStation {


//    ╭────────────────────╮
//    │  Complicated Shit  │
//    ╰────────────────────╯


  getArcStyle(idx: number, count: number): object {

    if (count <= 1) 
    {
      return {};
    }
    else if (count % 2 === 1 && idx === Math.floor(count / 2)) {
      return {
        '--transform': 'translateY(1.5em)',
        '--rotation': '0deg',
      };
    }

    // ---- \\
    
    const midVal = count % 2 === 0 ? (count - 1)/2 : Math.floor(count / 2);

    const transform = `translateY(${Math.abs(idx - midVal)/1.2 * 3}em)`;
    const rotation = `${((idx - midVal) * 40)/count}deg`

    return {
      '--transform': transform,
      '--rotation': rotation,
    };
  }
  
}
