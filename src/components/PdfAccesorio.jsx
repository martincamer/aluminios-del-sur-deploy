import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import img from "../assets/icons8-whatsapp-50.png";
import imgtwo from "../assets/icons8-enviar-50.png";
import imgtree from "../assets/icons8-google-maps-50.png";

export const PdfAccesorio = ({ accId, clienteId }) => {
  const styles = StyleSheet.create({
    table: {
      margin: "0 auto",
      width: "80%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "1px solid #000",
      borderBottom: "1px solid #000",
    },
    content_row: {
      borderTop: "1px solid #000",
      borderLeft: "1px solid #000",
      borderRight: "1px solid #000",
      paddingTop: "30px",
      paddingBottom: "30px",
      paddingHorizontal: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    header: {
      borderTop: "none",
    },
    bold: {
      fontWeight: "bold",
    },
    // So Declarative and unDRY 👌
    row1: {
      width: "20%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      borderRight: "1px solid #000",
      borderLeft: "1px solid #000",
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center",
    },
    row2: {
      width: "20%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      borderRight: "1px solid #000",
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center",
      textTransform: "capitalize",
    },
    row3: {
      width: "20%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      borderRight: "1px solid #000",
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center",
    },
    row4: {
      width: "20%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      paddingTop: 8,
      borderRight: "1px solid #000",
      paddingBottom: 8,
      textAlign: "center",
      textTransform: "uppercase",
    },
    contentFactura: {
      width: "80%",
      margin: "0 auto",
      paddingTop: "50px",
      paddingBottom: "50px",
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    content_uno: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      border: "2px solid #000",
      borderRadius: "10px",
      padding: "10px",
    },
    contentFinal: {
      width: "80%",
      margin: "0 auto",
      paddingTop: "50px",
      paddingBottom: "50px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  return (
    <Document>
      <Page style={{ width: "100%" }}>
        <View style={styles.contentFactura}>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "23px",
                fontWeight: "extrabold",
              }}
            >
              Aluminios Del Sur
            </Text>
            <Text
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              DISTRIBUIDORA DE PERFILES
            </Text>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Image
                src={img}
                style={{
                  width: "13px",
                  height: "13px",
                }}
              />{" "}
              <Text>3462-568534</Text>
            </View>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Image
                src={imgtwo}
                style={{
                  width: "13px",
                  height: "13px",
                }}
              />{" "}
              <Text>aluminiosdelsur21@gmail.com</Text>
            </View>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <View
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Image
                  src={imgtree}
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />{" "}
                <Text>Italia y Libertad</Text>
              </View>
              <View
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text>2732 - Elortondo(Sta Fe)</Text>
              </View>
            </View>
          </View>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "23px",
              }}
            >
              Presupuesto
            </Text>
            <View
              style={{
                fontSize: "10px",
                marginBottom: "6px",
              }}
            >
              <Text>NUMERO: {clienteId[0]?.id}</Text>
            </View>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                border: "1px solid #000",
                borderRadius: "10px",
              }}
            >
              <View
                style={{
                  borderBottom: "1px solid #000",
                  paddingRight: "5px",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  FECHA
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "80px",
                    padding: "10px",
                  }}
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.content_row}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                Señor/es:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                {clienteId[0]?.attributes.nombre}{" "}
                {clienteId[0]?.attributes.apellido}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                Domicilio:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "12px",
                }}
              ></Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                Localidad:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                {clienteId[0]?.attributes.localidad}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.row1}>CANTIDAD</Text>
            <Text style={styles.row2}>CODIGO</Text>
            <Text style={styles.row3}>PRECIO</Text>
            <Text style={styles.row4}>CATEGORIA</Text>
            <Text style={styles.row4}>COLOR</Text>
          </View>

          {/* <View style={{ display: 'flex', justifyContent: 'center' }}> */}
          {accId?.map((acc) => (
            <View key={acc.id} style={styles.row}>
              <Text style={styles.row1}>{acc.attributes.cantidad}</Text>
              <Text style={styles.row2}>{acc.attributes.codigo}</Text>
              <Text style={styles.row3}>
                ${acc.attributes.precio_standart.toLocaleString("arg")}
              </Text>
              <Text style={styles.row4}>{acc.attributes.categoria}</Text>
              <Text style={styles.row4}>{acc.attributes.color}</Text>
            </View>
          ))}
        </View>

        <View style={styles.contentFinal}>
          <View
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
              }}
            >
              Total de Accesorios: {clienteId[0]?.attributes.total_accesorios}
            </Text>
            {/* <Text
							style={{
								fontSize: '12px',
							}}
						>
							Precio : $
							{clienteId[0]?.attributes.total_pagar.toLocaleString('arg')}
						</Text>
						<Text
							style={{
								fontSize: '12px',
							}}
						>
							Precio Kilo Modena a-30:
						</Text>
						<Text
							style={{
								fontSize: '12px',
							}}
						>
							Total de Kilos: {clienteId[0]?.attributes.kilos} kg
						</Text> */}
            {/* <Text
							style={{
								fontSize: '12px',
							}}
						>
							Total de Kilos Modena:{' '}
							{clienteId[0]?.attributes.total_kilos_modena} kg
						</Text>
						<Text
							style={{
								fontSize: '12px',
							}}
						>
							Total de Kilos Modena a-30:{' '}
						</Text> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: "12px",
              }}
            >
              Total a pagar: $
              {clienteId[0]?.attributes.total_pagar.toLocaleString("arg")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
