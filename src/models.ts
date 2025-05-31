export interface ActividadRaw {
  nombre: string;
  duracion: number;
  estart: number;
  efinish: number;
  lstart: number;
  lfinish: number;
  htotal: number;
  hlibre: number;
  predecesores: string[];
  sucesores: string[];
}

export interface Proyecto {
  id: number;
  nombre: string;
}