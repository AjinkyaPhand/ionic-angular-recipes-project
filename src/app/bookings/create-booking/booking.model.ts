export class Booking {
    constructor(public id: string, public placeId: string, public userId: string, public placeTitle: string, public guestNumber: number,
        public placeImage: string, public fname: string, public lName: string, public bookedFrom: Date, public bookedTo: Date) { }
}