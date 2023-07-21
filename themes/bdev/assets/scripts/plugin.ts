export default abstract class Plugin {
  abstract init(): Promise<void>;
  abstract reset(): void;
}
