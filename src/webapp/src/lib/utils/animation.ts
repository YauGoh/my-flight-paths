export class Animation {
    private lastTimestamp: number;


    constructor() {
        this.lastTimestamp = 0;
    }

    public getDeltaSeconds(currentTimeStamp: number): number {
        let timestampDifference = 0;

        if (this.lastTimestamp > 0)
            timestampDifference = currentTimeStamp - this.lastTimestamp;

        this.lastTimestamp = currentTimeStamp;

        return timestampDifference / 1000;
    }
}