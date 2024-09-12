import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "expo-checkbox";
/* import RNFS from 'react-native-fs'; */
import {
  corFundo,
  cor2,
  cor3,
  cor3b,
  cor3c,
  cor3d,
  cor3e,
  cor3f,
  cor3g,
  cor3h,
  cor3i,
  cor3j,
  cor3k,
  cor3l,
} from "../colors";
import { logout } from "../authService";

export default function Ferramenta() {
  const navigation = useNavigation();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [mc1, setMc1] = useState(inputValue1);
  const [mc2, setMc2] = useState(inputValue2);
  const [conclusao1, setConclusao1] = useState(0);
  const [execucao1, setExecucao1] = useState(0);
  const [conclusao2, setConclusao2] = useState(0);
  const [execucao2, setExecucao2] = useState(0);
  const [ponto1, setPonto1] = useState(0);
  const [ponto2, setPonto2] = useState(0);

  const zerar = () => {
    setExecucao1(0);
    setConclusao1(0);
    setExecucao2(0);
    setConclusao2(0);
    setPonto1(0);
    setPonto2(0);
  };
  const ex1 = () => {
    setPonto1(ponto1 - 1);
    setExecucao1(execucao1 + 1);
  };
  const conc1 = () => {
    setPonto1(ponto1 - 3);
    setConclusao1(conclusao1 + 1);
  };
  const ex2 = () => {
    setPonto2(ponto2 - 1);
    setExecucao2(execucao2 + 1);
  };
  const conc2 = () => {
    setPonto2(ponto2 - 3);
    setConclusao2(conclusao2 + 1);
  };
  const handleInputChange1 = (text) => {
    setInputValue1(text);
  };
  const handleInputChange2 = (text) => {
    setInputValue2(text);
  };
  const handleSave1 = (i1) => {
    setMc1(i1);
  };
  const handleSave2 = (i2) => {
    setMc2(i2);
  };
  const handleSave = () => {
    handleSave1(inputValue1);
    handleSave2(inputValue2);
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("items");
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (
    mc1,
    mc2,
    ponto1,
    ponto2,
    execucao1,
    execucao2,
    conclusao1,
    conclusao2
  ) => {
    const newItems = [
      ...items,
      {
        id: Date.now().toString(),
        mc1,
        mc2,
        ponto1,
        ponto2,
        execucao1,
        execucao2,
        conclusao1,
        conclusao2,
      },
    ];
    newItems.sort((a, b) => a.mc1.localeCompare(b.mc1));
    setItems(newItems);
    saveItems(newItems);
  };

  /*  const removeItem = (id) => {
     const newItems = items.filter(item => item.id !== id);
     setItems(newItems);
     saveItems(newItems);
   }; */

  const clearInput1 = () => {
    setMc1("");
    setInputValue1("");
  };
  const clearInput2 = () => {
    setMc2("");
    setInputValue2("");
  };
  const handleAddItem = () => {
    handleSave;
    Alert.alert("Placar salvo no histórico!");
    addItem(
      mc1,
      mc2,
      ponto1,
      ponto2,
      execucao1,
      execucao2,
      conclusao1,
      conclusao2
    );
    setPonto1(0);
    setPonto2(0);
    setExecucao1(0);
    setExecucao2(0);
    setConclusao1(0);
    setConclusao2(0);
  };

  const currentDate = new Date();

  // Formata a data no formato dd/mm/aaaa
  const data = `${currentDate.getDate().toString().padStart(2, "0")}/${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  function abrir() {
    setModalVisible2(false);
  }
  const openModal1 = () => {
    setTimeout(abrir, 1000);
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        console.error("Erro ao deslogar: ", error);
      });
  };

  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectItem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeSelectedItems = () => {
    const newItems = items.filter((item) => !selectedIds.includes(item.id));
    setItems(newItems);
    saveItems(newItems);
    setSelectedIds([]);
  };
  const deselectAllItems = () => {
    setSelectedIds([]);
  };

  const clearAllItems = () => {
    Alert.alert(
      "Confirmar Remoção",
      "Você tem certeza de que deseja remover todos os itens do histórico?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("items");
              setItems([]);
              setSelectedIds([]);
              Alert.alert("Todos os itens foram removidos do histórico.");
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.scroll}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.container}>
        <Modal visible={modalVisible2}>
          <SafeAreaView style={styles.container3}>
            <View style={styles.contentC}>
              <TouchableOpacity onPress={closeModal2}>
                <Image
                  style={styles.closeC}
                  source={require("../../imagens/cross.png")}
                />
              </TouchableOpacity>

              <View style={styles.menuC}>
                <View style={styles.btnC}>
                  <Button
                    color={cor3b}
                    title="Histórico"
                    onPress={openModal1}
                  />
                </View>

                <View style={styles.btnC}>
                  <Button
                    color={cor3b}
                    title="Sair"
                    onPress={() => handleLogout()}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <View style={{ display: "none" }}>
          <TextInput
            /* editable={false} */ value={mc1}
            style={styles.inputEscondido}
            onChangeText={(text) => setMc1(text)}
          />
          <TextInput
            /* editable={false} */ value={mc2}
            style={styles.inputEscondido}
            onChangeText={(text) => setMc2(text)}
          />
          <TextInput
            /* editable={false} */ value={ponto1}
            style={styles.inputEscondido}
            onChangeText={(text) => setPonto1(text)}
          />
          <TextInput
            /* editable={false} */ value={ponto2}
            style={styles.inputEscondido}
            onChangeText={(text) => setPonto2(text)}
          />
          <TextInput
            /* editable={false} */ value={execucao1}
            style={styles.inputEscondido}
            onChangeText={(text) => setExecucao1(text)}
          />
          <TextInput
            /* editable={false} */ value={execucao2}
            style={styles.inputEscondido}
            onChangeText={(text) => setExecucao2(text)}
          />
          <TextInput
            /* editable={false} */ value={conclusao1}
            style={styles.inputEscondido}
            onChangeText={(text) => setConclusao1(text)}
          />
          <TextInput
            /* editable={false} */ value={conclusao2}
            style={styles.inputEscondido}
            onChangeText={(text) => setConclusao2(text)}
          />
        </View>
        <View style={styles.parte1}>
          <View style={styles.save}>
            <TouchableOpacity onPress={openModal2} style={styles.vOpen}>
              <Image
                style={styles.open}
                source={require("../../imagens/burguer.png")}
              />
            </TouchableOpacity>
            <View style={styles.btnSave}>
              <Button
                color={cor3}
                title="Salvar Resultados"
                onPress={handleAddItem}
              />
            </View>
          </View>
        </View>

        <View style={styles.parte2}>
          <View style={styles.competidor}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              MC 1
            </Text>
            <View style={styles.name}>
              <TextInput
                onChangeText={handleInputChange1}
                value={inputValue1}
                style={[styles.input, styles.name]}
                onFocus={clearInput1}
                onBlur={handleSave}
                placeholder="Digitar..."
                placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              />
            </View>
            <Text style={styles.placar}>{ponto1}</Text>
          </View>

          <View style={styles.competidor}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              MC 2
            </Text>
            <View style={styles.name}>
              <TextInput
                style={[styles.input, styles.name]}
                onChangeText={handleInputChange2}
                value={inputValue2}
                onFocus={clearInput2}
                onBlur={handleSave}
                placeholder="Digitar..."
                placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              />
            </View>
            <Text style={styles.placar}>{ponto2}</Text>
          </View>
        </View>

        <View style={styles.parte3}>
          <View style={styles.cols}>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3b}
                  title="0.25"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 0.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3b}
                  title="0.5"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 0.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3c}
                  title="0.75"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 0.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3c}
                  title="1.0"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 1.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3d}
                  title="1.25"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 1.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3d}
                  title="1.5"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 1.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3e}
                  title="1.75"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 1.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3e}
                  title="2.0"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 2.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3f}
                  title="2.25"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 2.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3f}
                  title="2.5"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 2.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3g}
                  title="2.75"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 2.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3g}
                  title="3.0"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 3.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3h}
                  title="3.25"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 3.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3h}
                  title="3.5"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 3.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3i}
                  title="3.75"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 3.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3i}
                  title="4.0"
                  onPress={() => {
                    handleSave();
                    setPonto1(ponto1 + 4.0);
                  }}
                />
              </View>
            </View>

            <View style={styles.rowsErr}>
              <TouchableOpacity
                style={styles.btnsPenalidade}
                onPress={() => {
                  handleSave();
                  ex1();
                }}
              >
                <Text
                  style={{
                    backgroundColor: cor3j,
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
                    padding: 3,
                    height: 40,
                  }}
                >
                  ERRO DE EXECUÇÃO
                </Text>
              </TouchableOpacity>
              <Text style={styles.errContagem1}>{execucao1}</Text>
            </View>

            <View style={styles.rowsErr}>
              <TouchableOpacity
                style={styles.btnsPenalidade}
                onPress={() => {
                  handleSave();
                  conc1();
                }}
              >
                <Text
                  style={{
                    backgroundColor: cor3k,
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
                    padding: 3,
                    height: 40,
                  }}
                >
                  ERRO DE CONCLUSÃO
                </Text>
              </TouchableOpacity>
              <Text style={styles.errContagem1}>{conclusao1}</Text>
            </View>
          </View>

          <View style={styles.cols}>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3b}
                  title="0.25"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 0.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3b}
                  title="0.5"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 0.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3c}
                  title="0.75"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 0.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3c}
                  title="1.0"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 1.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3d}
                  title="1.25"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 1.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3d}
                  title="1.5"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 1.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3e}
                  title="1.75"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 1.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3e}
                  title="2.0"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 2.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3f}
                  title="2.25"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 2.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3f}
                  title="2.5"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 2.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3g}
                  title="2.75"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 2.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3g}
                  title="3.0"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 3.0);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3h}
                  title="3.25"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 3.25);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3h}
                  title="3.5"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 3.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.btns}>
                <Button
                  color={cor3i}
                  title="3.75"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 3.75);
                  }}
                />
              </View>
              <View style={styles.btns}>
                <Button
                  color={cor3i}
                  title="4.0"
                  onPress={() => {
                    handleSave();
                    setPonto2(ponto2 + 4.0);
                  }}
                />
              </View>
            </View>

            <View style={styles.rowsErr}>
              <TouchableOpacity
                style={styles.btnsPenalidade}
                onPress={() => {
                  handleSave();
                  ex2();
                }}
              >
                <Text
                  style={{
                    backgroundColor: cor3j,
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
                    padding: 3,
                    height: 40,
                  }}
                >
                  ERRO DE EXECUÇÃO
                </Text>
              </TouchableOpacity>
              <Text style={styles.errContagem1}>{execucao2}</Text>
            </View>

            <View style={styles.rowsErr}>
              <TouchableOpacity
                style={styles.btnsPenalidade}
                onPress={() => {
                  handleSave();
                  conc2();
                }}
              >
                <Text
                  style={{
                    backgroundColor: cor3k,
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
                    padding: 3,
                    height: 40,
                  }}
                >
                  ERRO DE CONCLUSÃO
                </Text>
              </TouchableOpacity>
              <Text style={styles.errContagem1}>{conclusao2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.parte4}>
          <View style={styles.btnZerar}>
            <Button color={cor3} title="zerar" onPress={zerar} />
          </View>
        </View>

        <Modal visible={modalVisible1}>
          <View style={styles.container2}>
            <View style={styles.logoBtnB}>
              <View style={styles.btnB}>
                <Button
                  color={cor3b}
                  title="Voltar"
                  onPress={() => {
                    closeModal1();
                    closeModal2();
                  }}
                />

                <Button
                  color={cor3b}
                  title="Limpar Histórico"
                  onPress={clearAllItems}
                />
              </View>

              <View
                style={{
                  height: 60,
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  paddingHorizontal: 15,
                }}
              >
                {selectedIds.length > 0 && (
                  <View
                    style={{
                      width: 170,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={deselectAllItems}
                      style={{
                        width: 50,
                        justifyContent: "center",
                        display: "flex",
                        height: 35,
                        borderRadius: 20,
                        width: 35,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: 26,
                          height: 26,
                        }}
                        source={require("../../imagens/cross.png")}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 15,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >{`${selectedIds.length} selecionado(s)`}</Text>
                  </View>
                )}

                {selectedIds.length > 0 && (
                  <TouchableOpacity
                    onPress={removeSelectedItems}
                    style={styles.actionButtonB}
                  >
                    <Text
                      style={{
                        color: "#CDB3F4",
                        fontSize: 14,
                        borderWidth: 1,
                        borderColor: "#CDB3F4",
                        padding: 9,
                        borderRadius: 20,
                        width: 90,
                        height: 40,
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Excluir
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <FlatList
              style={{ width: "100%", padding: 10 }}
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.placarListB}>
                  <View style={{ backgroundColor: "white", width: 20 }}>
                    <CheckBox
                      value={selectedIds.includes(item.id)}
                      onValueChange={() => toggleSelectItem(item.id)}
                    />
                  </View>

                  <View style={styles.placaresB}>
                    <View style={styles.placarB}>
                      <Text style={styles.nomeB}>{item.mc1}</Text>

                      <View style={styles.pontosB}>
                        <View style={styles.pontoB}>
                          <Text>Pontos:</Text>
                          <Text style={styles.p}>{item.ponto2}</Text>
                        </View>
                        <View style={styles.pontoB}>
                          <Text>Err Ex:</Text>
                          <Text style={styles.ex}>{item.execucao1}</Text>
                        </View>
                        <View style={styles.pontoB}>
                          <Text>Err Concl:</Text>
                          <Text style={styles.ec}>{item.conclusao1}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <Text style={styles.xB}>Data da Batalha:</Text>
                      <Text style={styles.dateB}>{data}</Text>
                      <View style={{ width: "100%", display: "flex" }}>
                        <Image
                          style={styles.logoB}
                          source={require("../../imagens/logoc.png")}
                        />
                      </View>
                    </View>

                    <View style={styles.placarB}>
                      <Text style={styles.nomeB}>{item.mc2}</Text>
                      <View style={styles.pontosB}>
                        <View style={styles.pontoB}>
                          <Text>Pontos:</Text>
                          <Text style={styles.p}>{item.ponto2}</Text>
                        </View>
                        <View style={styles.pontoB}>
                          <Text>Erro Ex:</Text>
                          <Text style={styles.ex}>{item.execucao2}</Text>
                        </View>
                        <View style={styles.pontoB}>
                          <Text>Err Concl:</Text>
                          <Text style={styles.ec}>{item.conclusao2}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingTop: 45,
    backgroundColor: corFundo,
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    rowGap: 10,
  },
  modalBackground2: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent2: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  inputEscondido: {
    backgroundColor: "white",
  },
  parte1: {
    width: "100%",
    rowGap: 13,
    display: "flex",
    alignItems: "center",
  },
  save: {
    width: "100%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnSave: {
    width: 200,
    display: "flex",
    alignSelf: "center",
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    columnGap: 60,
  },

  input: {
    width: 135,
    height: "100%",
    /*   backgroundColor: 'rgba(255, 255, 255, 0.1)', // Torna o input transparente */
    color: "white",
    borderColor: "transparent", // Remove a borda inicial
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  btn: {
    width: 200,
    paddingVertical: 5,
  },

  parte2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  name: {
    backgroundColor: cor3b,
    width: 135,
    display: "flex",
    height: 55,
    color: "white",
    fontSize: 13,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  placar: {
    width: "100%",
    color: "white",
    fontSize: 30,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },

  competidor: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    rowGap: 6,
  },
  open: {
    width: 40,
    height: 40,
  },
  vOpen: {
    width: 40,
    display: "flex",
    marginBottom: 0,
  },
  parte3: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btns: {
    width: 60,
    borderRadius: 10,
  },

  cols: {
    width: "45%",
    display: "flex",
    rowGap: 10,
  },
  rows: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "center",
  },
  parte4: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
  rowsErr: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 5,
  },
  btnZerar: {
    width: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  btnsPenalidade: {
    width: 100,
    height: 40,
    borderRadius: 10,
  },
  errContagem1: {
    color: "white",
    backgroundColor: cor3i,
    width: "20%",
    padding: 2,
    height: "100%",
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 5,
  },
  container2: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingVertical: 20,
    rowGap: 18,
    backgroundColor: corFundo,
  },

  actionButtonB: {
    width: 65,
    height: "20%",
    display: "flex",
    alignItems: "center",
  },
  excluirB: {
    width: 25,
    height: 25,
  },
  placarListB: {
    rowGap: 5,
    width: "100%",
    marginBottom: 20,
    backgroundColor: cor2,
    height: 200,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: cor3,
    borderRadius: 10,
  },
  placaresB: {
    display: "flex",
    height: "100%",
    width: "100%",
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  placarB: {
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
  },
  centroB: {
    alignItems: "center",
    height: "80%",
    width: "33%",
  },
  xB: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  dateB: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  nomeB: {
    fontSize: 20,
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },
  pontosB: {
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    color: "black",
  },
  pontoB: {
    display: "flex",
    flexDirection: "row",
    columnGap: 6,
    width: "100%",
    justifyContent: "center",
    rowGap: 5,
  },
  p: {
    fontSize: 17,
  },
  ex: {
    fontSize: 17,
  },
  ec: {
    fontSize: 17,
  },
  logoB: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  btnB: {
    alignSelf: "flex-start",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCont: {
    borderRadius: 20, // Muda o border radius aqui
    overflow: "hidden", // Necessário para o borderRadius funcionar
  },
  logoBtnB: {
    display: "flex",
    rowGap: 20,
    width: "100%",
    paddingHorizontal: 15,
  },
  container3: {
    width: "100%",
    flex: 1,
    backgroundColor: corFundo,
  },
  contentC: {
    backgroundColor: corFundo,
    padding: 33,
    height: "100%",
    width: "100%",
  },
  opacitC: {
    flex: 1,
    zIndex: 9,
  },
  closeC: {
    width: 38,
    height: 38,
    display: "flex",
    alignSelf: "flex-start",
  },
  menuC: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 100,
    rowGap: 20,
  },
  btnC: {
    width: "100%",
  },
});
