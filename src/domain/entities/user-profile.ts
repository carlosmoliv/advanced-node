export class UserProfile {
  initials?: string
  pictureUrl?: string

  constructor (readonly id: string) {}

  setPicture ({ pictureUrl, name }: { pictureUrl?: string, name?: string }): void {
    this.pictureUrl = pictureUrl
    if (pictureUrl === undefined && name !== undefined && name.trim() !== '') {
      const firstLetters = name.match(/\b(.)/g)!
      if (firstLetters.length > 1) {
        this.initials = `${firstLetters.shift()!.toUpperCase()}${firstLetters.pop()!.toUpperCase()}`
      } else {
        this.initials = name.slice(0, 2).toUpperCase()
      }
    }
  }
}
