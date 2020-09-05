export class User {
    constructor(public id: string, public email: string, private _token: string, private expiresOn: Date) { }

    public get token() {
        if (!this.expiresOn || this.expiresOn <= new Date()) {
            return null;
        }
        return this._token;
    }
}