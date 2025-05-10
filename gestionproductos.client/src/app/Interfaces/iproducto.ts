export interface Producto {
  id?: number;          
  nombre: string;      
  descripcion?: string; 
  precioBase: number;   
  precioDescuento?: number; 
  imagen?: string;     
}