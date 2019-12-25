import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: string, numberOfCharacters?: number): any {
        numberOfCharacters = numberOfCharacters && numberOfCharacters > 10 ? numberOfCharacters : 50;
        const firstLine = value.split('\n')[0].trim();
        if (firstLine.length > numberOfCharacters) {
            return firstLine.slice(0, numberOfCharacters - 3).trim() + '...';
        } else {
            return firstLine;
        }
    }
}
