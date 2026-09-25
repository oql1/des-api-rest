# Estructura de un archivo WSDL para un servicio web SOAP

**WSDL** significa *Web Services Description Language* (lenguaje de descripción de servicios web). Es un documento XML que describe qué operaciones ofrece un servicio, qué datos intercambia, cómo se transmiten los mensajes y dónde se encuentra el servicio. En un servicio SOAP, el WSDL actúa como contrato entre el proveedor y sus clientes.

## Elementos principales

| Elemento | Función |
| --- | --- |
| `<definitions>` | Raíz del WSDL. Declara el nombre del contrato, los espacios de nombres y el `targetNamespace`, que identifica sus componentes. |
| `<types>` | Define los tipos de datos mediante XML Schema (XSD), como las estructuras de solicitud y respuesta. |
| `<message>` | Declara los mensajes de entrada y salida. Cada `<part>` referencia un elemento o tipo definido en el esquema. |
| `<portType>` | Agrupa las operaciones abstractas del servicio y especifica sus mensajes de entrada y salida. |
| `<binding>` | Concreta el protocolo y el formato de las operaciones de un `portType`; en este caso, SOAP sobre HTTP. |
| `<service>` | Agrupa uno o más puntos de acceso (`<port>`). Cada puerto asocia un `binding` con una dirección real (`soap:address`). |

El recorrido habitual es: **tipos → mensajes → operaciones → enlace SOAP → dirección del servicio**.

## Ejemplo mínimo de WSDL 1.1

El siguiente contrato describe una operación `saludar` que recibe un nombre y devuelve un saludo. Las URL y el espacio de nombres son ilustrativos.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:tns="https://ejemplo.com/saludos"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             name="ServicioSaludos"
             targetNamespace="https://ejemplo.com/saludos">

  <types>
    <xsd:schema targetNamespace="https://ejemplo.com/saludos"
                elementFormDefault="qualified">
      <xsd:element name="saludarRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="nombre" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="saludarResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="saludo" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>

  <message name="SaludarEntrada">
    <part name="parameters" element="tns:saludarRequest"/>
  </message>
  <message name="SaludarSalida">
    <part name="parameters" element="tns:saludarResponse"/>
  </message>

  <portType name="SaludosPortType">
    <operation name="saludar">
      <input message="tns:SaludarEntrada"/>
      <output message="tns:SaludarSalida"/>
    </operation>
  </portType>

  <binding name="SaludosSoapBinding" type="tns:SaludosPortType">
    <soap:binding style="document"
                  transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="saludar">
      <soap:operation soapAction="https://ejemplo.com/saludos/saludar"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>

  <service name="ServicioSaludos">
    <port name="SaludosPort" binding="tns:SaludosSoapBinding">
      <soap:address location="https://ejemplo.com/soap/saludos"/>
    </port>
  </service>
</definitions>
```

### Cómo se relacionan los elementos

1. `saludarRequest` y `saludarResponse` definen la forma de los datos XML.
2. `SaludarEntrada` y `SaludarSalida` referencian esos elementos y constituyen los mensajes.
3. `SaludosPortType` declara la operación `saludar` y vincula sus mensajes.
4. `SaludosSoapBinding` indica que la operación usa SOAP sobre HTTP, con estilo `document` y contenido `literal`.
5. `ServicioSaludos` publica el enlace en `https://ejemplo.com/soap/saludos`.

El WSDL describe el contrato; el contenido de una petición o respuesta concreta viaja dentro de un **sobre SOAP** (`Envelope`), que es otro documento XML.
