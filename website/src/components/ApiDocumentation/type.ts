export interface ApiProperty {
  prop: string;
  type: string;
  description: string;
  defaultValue: string;
}

export interface RefMethod {
  method: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  requestAnimationFrame: string;
  setTimeout: string;
}

export interface FormulaType {
  type: string;
  inline: string;
  block: string;
  example: string;
}
