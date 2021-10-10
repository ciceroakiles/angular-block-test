export class RNGService {

    private static rng: number;

    public static randomInt(min: number, max: number): number {
        RNGService.rng = Math.floor(Math.random() * (max - min + 1) + min);
        return RNGService.rng;
    };
}
