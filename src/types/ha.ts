export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  language?: string;
  locale?: {
    language?: string;
  };
  themes?: {
    darkMode?: boolean;
  };
  localize?(key: string): string;
  callApi?<T>(method: string, path: string, parameters?: Record<string, unknown>): Promise<T>;
  callWS?<T>(message: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, serviceData?: Record<string, unknown>): Promise<unknown>;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize?(): number;
  getGridOptions?(): LovelaceCardGridOptions;
}

export interface LovelaceCardGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
}

export interface HaFormSchema {
  type?: string;
  name: string;
  icon?: string;
  schema?: HaFormSchema[];
  selector?: Record<string, unknown>;
  conditions?: Array<{ name: string; value: unknown }>;
}

export interface HaFormChangedEvent<T> extends CustomEvent {
  detail: {
    value: T;
  };
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
