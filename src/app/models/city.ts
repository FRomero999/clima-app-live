// Contrato del dato Ciudad: TypeScript avisa si falta un campo o el tipo no coincide.
export interface City {
    id: string;
    name: string;
    country: string;
    description: string;
    image: string;
    savedAt: Date;
    favorite: boolean;
  }
