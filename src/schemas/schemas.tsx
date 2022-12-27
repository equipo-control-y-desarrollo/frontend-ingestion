import {object, string, number, date, boolean} from 'yup';

let carteraSchema = object({
    valor: number().required().positive().integer(),
    valor_abonado: number().optional().positive().integer().default(0),
    valor_total: number().optional().positive().integer(),
    fecha_factura: date().required(),
    fecha_vencimiento: date().required(),
    estado: boolean().optional().default(false),
    nro_factura: string().required(),
    proyecto: string().optional(),
    dias_vencido: number().optional().positive().integer(),
    empresa_id: number().required().positive().integer(),
    empresa: number().required().positive().integer()
})

let cuentaSchema = object({
    banco: string().required().length(20),
    empresa_id: number().required().positive().integer(),
    numero: string().required().length(20),
    tipo: string().required(),
}).strict()

let cuadroVentasSchemas = object({
    empresa_id: number().required().integer().positive(),
    ventas_ma_ana: number().optional().positive().default(0),
    ventas_tarde: number().optional().positive().default(0),
    ventas_totales: number().optional().positive(),
    efectivo: number().optional().positive().default(0),
    datafono: number().optional().positive().default(0),
    transferencia: number().optional().positive().default(0),
    propinas: number().optional().positive().default(0),
    iva: number().optional().positive().default(0),
    hipoconsumo: number().optional().positive().default(0),
    venta_neta: number().optional().positive(),
    tks: number().required().integer().positive(),
    tks_promedio: number().optional().positive(),
    epayco: number().optional().positive().default(0),
    ventas_cafe: number().optional().positive().default(0),
    ventas_bar: number().optional().positive().default(0),
    ventas_mercado: number().optional().positive().default(0),
    gastos_caja_menor: number().optional().positive().default(0),
    fecha: date().required(),
    horas_reserva: number().optional().integer().positive(),
})

let cuentaPendienteSchema = object({
    proyecto: string().required().length(50),
    nit: string().optional().length(30),
    proveedor: string().optional().length(100),
    nfactura: string().optional().length(20),
    fecha_recibido: date().required(),
    estado: string().optional().length(20),
    inmediato: number().optional().integer().positive().default(0),
    dias_30: number().optional().integer().positive().default(0),
    dias_60: number().optional().integer().positive().default(0),
    fecha_vencida : date().required(),
    empresa_id : number().required().integer().positive(),
})

let flujoCajaSchema = object({
    fecha: date().required(),
    empresa_id: number().required().integer().positive(),
    saldo_anterior: number().optional().positive().default(0),
})

let registroVentaSchema = object({
    fecha: date().required(),
    empresa_id : number().required().integer().positive(),
    cantidad: number().required().integer().positive().default(1),
    producto: string().required().length(20),
    valor_total: number().required().integer().positive(),
    empresa: number().required().integer().positive(),
})

export {
    cuentaSchema,
    carteraSchema,
    cuadroVentasSchemas,
    cuentaPendienteSchema,
    flujoCajaSchema,
    registroVentaSchema
}