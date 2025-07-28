import { Injectable } from '@angular/core';
import { PlayingCard } from './satchel';

@Injectable({
  providedIn: 'root'
})
export class AnimationStation {

  // Suit Animations
  private color_heart: string = '#9b111f55'
  private color_diamond: string = '#28c8d455'
  private color_club: string = '#3aa04255'
  private color_spade: string = '#392bd655'



//    ╭───────────────────╮
//    │  Utility Methods  │
//    ╰───────────────────╯


  // TODO: fix this fucking monstrosity
  public getSuitHighlight(card: PlayingCard): string {
    switch(card?.suit) {
      case '♡' :
        return '#9b111f55'
      case '♢' :
        return '#28c8d455'
      case '♧' :
        return '#3aa04255'
      case '♤' :
        return '#392bd655'
    }

    return '';
  }


//    ╭──────────────────────╮
//    │  General Animations  │
//    ╰──────────────────────╯


  // Change card styles on hover by setting event listeners
  public applyCardHoverHighlight(htmlCard: HTMLElement, card: PlayingCard): void {
    // Set background color based on suit
    htmlCard.addEventListener('mouseenter', () => {
      htmlCard.style.setProperty('background-color', this.getSuitHighlight(card));
    })

    // Reset background color on mouse leave
    htmlCard.addEventListener('mouseleave', () => {
      htmlCard.style.setProperty('background-color', 'transparent');
    })
  }




//    ╭────────────────────╮
//    │  Complicated Shit  │
//    ╰────────────────────╯


  public getHandArcStyleVars(idx: number, count: number): object {
    if (count <= 1) return {};
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
