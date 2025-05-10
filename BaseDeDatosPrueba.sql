CREATE DATABASE ProductosDb;
go
USE ProductosDb;
go
CREATE TABLE TbProductos
(
    Id INT PRIMARY KEY IDENTITY NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255),
    PrecioBase DECIMAL(38,2) NOT NULL,
    PrecioDescuento DECIMAL(38,2),
    Imagen VARCHAR(MAX)
);
go
CREATE OR ALTER PROCEDURE SpProductos
(
    @pModo CHAR(1),
    @pId INT = 0,
    @pNombre VARCHAR(100) = NULL,
    @pDescripcion VARCHAR(255) = NULL,
    @pPrecioBase DECIMAL(38,2) = NULL,
    @pPrecioDescuento DECIMAL(38,2) = NULL,
    @pImagen VARCHAR(MAX) = NULL,
    @pCodigo VARCHAR(1) OUTPUT,
    @pMensaje VARCHAR(250) OUTPUT
)
AS
BEGIN
    BEGIN TRY
        IF @pModo = 'I'
        BEGIN
            IF @pPrecioBase <= 0
            BEGIN
                THROW 50001, 'El precio del producto debe ser mayor a 0', 1;
            END
            
            INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, Imagen)
            VALUES (@pNombre, @pDescripcion, @pPrecioBase, @pImagen);

            SET @pMensaje = 'Producto agregado correctamente';
            SET @pCodigo = '1';
        END
        ELSE IF @pModo = 'U'
        BEGIN
            IF @pId = 0
            BEGIN
                THROW 50001, 'El ID de producto no es válido', 1;
            END

            IF @pPrecioBase IS NOT NULL AND @pPrecioBase <= 0
            BEGIN
                THROW 50001, 'El precio del producto debe ser mayor a 0', 1;
            END

            IF @pPrecioDescuento IS NOT NULL AND @pPrecioDescuento <= 0
            BEGIN
                THROW 50001, 'El precio con descuento debe ser mayor a 0', 1;
            END

            UPDATE TbProductos
                SET Nombre = COALESCE(@pNombre, Nombre),
                    Descripcion = COALESCE(@pDescripcion, Descripcion),
                    PrecioBase = COALESCE(@pPrecioBase, PrecioBase),
                    PrecioDescuento = COALESCE(@pPrecioDescuento, PrecioDescuento),
                    Imagen = COALESCE(@pImagen, Imagen)
            WHERE Id = @pId;

            SET @pMensaje = 'Producto actualizado correctamente';
            SET @pCodigo = '1';
        END
        ELSE IF @pModo = 'D'
        BEGIN
            IF @pId = 0
            BEGIN
                THROW 50001, 'El ID de producto no es válido', 1;
            END;

            DELETE TbProductos
            WHERE Id = @pId;

            SET @pMensaje = 'Producto eliminado correctamente';
            SET @pCodigo = '1';
        END;
        ELSE
        BEGIN
            THROW 50002, 'La opción seleccionada no es válida', 1;
        END
    END TRY

    BEGIN CATCH
        SET @pMensaje = 'Error: ' + ERROR_MESSAGE();
        SET @pCodigo = '0';
    END CATCH
END;
go
CREATE OR ALTER PROCEDURE SpListadoProductos
(
    @pId INT = NULL
)
AS 
BEGIN
    SELECT 
        Id,
        Nombre, 
        Descripcion, 
        PrecioBase,
        PrecioDescuento,
        Imagen
    FROM TbProductos
    WHERE (@pId IS NULL OR Id = @pId);
    RETURN;
END;

go

-- Productos electrónicos
INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Smartphone X9', 'Teléfono inteligente con cámara de 48MP', 599.99, 549.99, 'https://ejemplo.com/imgs/phone_x9.jpg');

INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Laptop Ultradelgada', 'Laptop de 14 pulgadas, 8GB RAM, SSD 256GB', 899.00, NULL, 'https://ejemplo.com/imgs/laptop_ultra.jpg');

-- Electrodomésticos
INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Refrigerador Smart', 'Refrigerador de 20 pies cúbicos con WiFi', 1299.50, 1199.00, 'https://ejemplo.com/imgs/fridge_smart.jpg');

INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Licuadora Profesional', '1000W, 8 velocidades, jarra de vidrio', 89.99, 75.50, 'https://ejemplo.com/imgs/blender_pro.jpg');

-- Alimentos
INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Café Premium 500g', 'Granos de café arábica tostado medio', 12.99, NULL, 'https://ejemplo.com/imgs/coffee_premium.jpg');

INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Chocolate Artesanal', 'Tableta 85% cacao, 100g', 6.50, 5.99, 'https://ejemplo.com/imgs/chocolate_art.jpg');

-- Hogar
INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Juego de Sábanas Algodón', '200 hilos, tamaño queen, color blanco', 45.00, 39.99, 'https://ejemplo.com/imgs/sheets_cotton.jpg');

INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Lámpara LED Moderna', 'Ajustable, luz cálida/fría, control táctil', 34.99, NULL, 'https://ejemplo.com/imgs/lamp_led.jpg');

-- Varios
INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Mochila Antirrobo', 'Con puerto USB y compartimento para laptop', 49.99, 42.50, 'https://ejemplo.com/imgs/backpack_safe.jpg');

INSERT INTO TbProductos (Nombre, Descripcion, PrecioBase, PrecioDescuento, Imagen)
VALUES ('Set de Herramientas 60pc', 'Incluye destornilladores, llaves y más', 79.99, 69.99, 'https://ejemplo.com/imgs/tools_set.jpg');