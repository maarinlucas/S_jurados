import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, FlatList, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
/* import RNFS from 'react-native-fs'; */


export default function Ferramenta() {
  const navigation = useNavigation();

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [mc1, setMc1] = useState(inputValue1);
  const [mc2, setMc2] = useState(inputValue2);
  const [conclusao1, setConclusao1] = useState(0);
  const [execucao1, setExecucao1] = useState(0);
  const [conclusao2, setConclusao2] = useState(0);
  const [execucao2, setExecucao2] = useState(0);
  const [ponto1, setPonto1] = useState(0);
  const [ponto2, setPonto2] = useState(0);


  const zerar = () => {
    setExecucao1(0)
    setConclusao1(0)
    setExecucao2(0)
    setConclusao2(0)
    setPonto1(0)
    setPonto2(0)
  }

  const ex1 = () => {
    setPonto1(ponto1 - 1)
    setExecucao1(execucao1 + 1)
  }
  const conc1 = () => {
    setPonto1(ponto1 - 3)
    setConclusao1(conclusao1 + 1)
  }
  const ex2 = () => {
    setPonto2(ponto2 - 1)
    setExecucao2(execucao2 + 1)
  }
  const conc2 = () => {
    setPonto2(ponto2 - 3)
    setConclusao2(conclusao2 + 1)
  }
  const handleInputChange1 = (text) => {
    setInputValue1(text);
  };
  const handleInputChange2 = (text) => {
    setInputValue2(text);
  };
  const handleSave1 = (i1) => {
    setMc1(i1)


  };
  const handleSave2 = (i2) => {
    setMc2(i2)


  };

  const handleSave = () => {
    handleSave1(inputValue1)
    handleSave2(inputValue2)
  };



  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);


  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (mc1, mc2, ponto1, ponto2, execucao1, execucao2, conclusao1, conclusao2) => {
    const newItems = [...items, { id: Date.now().toString(), mc1, mc2, ponto1, ponto2, execucao1, execucao2, conclusao1, conclusao2 }];
    newItems.sort((a, b) => a.mc1.localeCompare(b.mc1));
    setItems(newItems);
    saveItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveItems(newItems);
  };

  const clearInput1 = () => {
    setMc1('');
    setInputValue1('')
  }
  const clearInput2 = () => {
    setMc2('');
    setInputValue2('')
  }


  const handleAddItem = () => {
    handleSave
    Alert.alert('Placar salvo no histórico!');
    addItem(mc1, mc2, ponto1, ponto2, execucao1, execucao2, conclusao1, conclusao2);
    setMc1('');
    setMc2('');
    setPonto1(0);
    setPonto2(0);
    setExecucao1(0);
    setExecucao2(0);
    setConclusao1(0);
    setConclusao2(0);


  };

  const currentDate = new Date();

  // Formata a data no formato dd/mm/aaaa
  const data = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')
    }/${currentDate.getFullYear()}`;


  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  function abrir() {
    setModalVisible2(false)
  }

  const openModal1 = () => {
    setTimeout(abrir, 1000)
    setModalVisible1(true)
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

 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
      setModalVisible2(false);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  };

  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectItem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeSelectedItems = () => {
    const newItems = items.filter(item => !selectedIds.includes(item.id));
    setItems(newItems);
    saveItems(newItems);
    setSelectedIds([]);
  };
  const deselectAllItems = () => {
    setSelectedIds([]);
  };

  const clearAllItems = () => {
    Alert.alert(
      'Confirmar Remoção',
      'Você tem certeza de que deseja remover todos os itens do histórico?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('items');
              setItems([]);
              setSelectedIds([]);
              Alert.alert('Todos os itens foram removidos do histórico.');
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>

      <Modal visible={modalVisible2}>
        <SafeAreaView style={styles.container3} >

          <View style={styles.contentC}>
            <TouchableOpacity
              onPress={closeModal2}
            >
              <Image style={styles.closeC} source={require('../imagens/cross.png')} />
            </TouchableOpacity>

            <View style={styles.menuC}>

              <View
                style={styles.btnC}
              >
                <Button
                  color="#48474C"
                  title="Histórico de batalhas"
                  onPress={openModal1}
                />

              </View>

              <View
                style={styles.btnC}
              >
              </View>
              <View
                style={styles.btnC}
              >
                <Button
                  color="#48474C"
                  title="Sair"
                  onPress={() => handleLogout()}
                />

              </View>

            </View>

          </View>

        </SafeAreaView>

      </Modal>

      <View style={styles.parte1}>
        <View style={{ display: 'none' }}>
          <TextInput /* editable={false} */ value={mc1} style={styles.inputEscondido} onChangeText={(text) => setMc1(text)} />
          <TextInput /* editable={false} */ value={mc2} style={styles.inputEscondido} onChangeText={(text) => setMc2(text)} />
          <TextInput /* editable={false} */ value={ponto1} style={styles.inputEscondido} onChangeText={(text) => setPonto1(text)} />
          <TextInput /* editable={false} */ value={ponto2} style={styles.inputEscondido} onChangeText={(text) => setPonto2(text)} />
          <TextInput /* editable={false} */ value={execucao1} style={styles.inputEscondido} onChangeText={(text) => setExecucao1(text)} />
          <TextInput /* editable={false} */ value={execucao2} style={styles.inputEscondido} onChangeText={(text) => setExecucao2(text)} />
          <TextInput /* editable={false} */ value={conclusao1} style={styles.inputEscondido} onChangeText={(text) => setConclusao1(text)} />
          <TextInput /* editable={false} */ value={conclusao2} style={styles.inputEscondido} onChangeText={(text) => setConclusao2(text)} />

        </View>
        <View style={styles.save}>
          <TouchableOpacity
            onPress={openModal2}
            style={styles.vOpen}>
            <Image style={styles.open} source={require('../imagens/burguer.png')} />
          </TouchableOpacity>
          <View
            style={styles.btnSave}
          >
            <Button
              color="#48474C"
              title="Salvar Resultados"
              onPress={handleAddItem}
            />
          </View>
        </View>


      </View>


      <View style={styles.parte2}>

        <View style={styles.competidor1}>
          <Text style={styles.name1} >
            <TextInput
              onChangeText={handleInputChange1}
              value={inputValue1}
              style={styles.input}
              onFocus={clearInput1}
              onBlur={handleSave}
              placeholder='Digite um Nome...'
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              underlineColorAndroid="transparent" // Remove a linha de sublinhado no Android

            />
          </Text>
          <Text style={styles.placar} >{ponto1}</Text>
        </View>

        <View style={styles.competidor2}>
          <Text style={styles.name2}>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange2}
              value={inputValue2}
              onFocus={clearInput2}
              onBlur={handleSave}
              placeholder='Digite um Nome...'
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              underlineColorAndroid="transparent" // Remove a linha de sublinhado no Android
            />
          </Text>
          <Text style={styles.placar}>{ponto2}</Text>

        </View>
      </View>

      <View style={styles.parte3}>

        <View style={styles.cols}>

          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="0.5"
                onPress={() => setPonto1(ponto1 + 0.5)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.0"
                onPress={() => setPonto1(ponto1 + 1)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.25"
                onPress={() => setPonto1(ponto1 + 1.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.5"
                onPress={() => setPonto1(ponto1 + 1.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.75"
                onPress={() => setPonto1(ponto1 + 1.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="2.0"
                onPress={() => setPonto1(ponto1 + 2.0)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.25"
                onPress={() => setPonto1(ponto1 + 2.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.5"
                onPress={() => setPonto1(ponto1 + 2.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.75"
                onPress={() => setPonto1(ponto1 + 2.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="3.0"
                onPress={() => setPonto1(ponto1 + 3.0)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.25"
                onPress={() => setPonto1(ponto1 + 3.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.5"
                onPress={() => setPonto1(ponto1 + 3.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.75"
                onPress={() => setPonto1(ponto1 + 3.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="4.0"
                onPress={() => setPonto1(ponto1 + 4.0)} />
            </View>
          </View>
          <View style={styles.rowsErr}>
            <View
              style={styles.btnsPenalidade}
            >
              <Button
                color="#42017C"
                title={`Err Exec`}
                onPress={() => ex1()}

              />
            </View>
            <Text style={styles.errContagem1}>{execucao1}</Text>
          </View>

          <View style={styles.rowsErr}>
            <View
              style={styles.btnsPenalidade}
            >
              <Button
                color="#42017C"
                title={`Err Conc`}
                onPress={() => conc1()}
              />

            </View>
            <Text style={styles.errContagem1}>{conclusao1}</Text>


          </View>


        </View>



        <View style={styles.cols}>

          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="0.5"
                onPress={() => setPonto2(ponto2 + 0.5)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.0"
                onPress={() => setPonto2(ponto2 + 1)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.25"
                onPress={() => setPonto2(ponto2 + 1.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.5"
                onPress={() => setPonto2(ponto2 + 1.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="1.75"
                onPress={() => setPonto2(ponto2 + 1.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#2D9639"
                title="2.0"
                onPress={() => setPonto2(ponto2 + 2.0)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.25"
                onPress={() => setPonto2(ponto2 + 2.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.5"
                onPress={() => setPonto2(ponto2 + 2.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="2.75"
                onPress={() => setPonto2(ponto2 + 2.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#C27D06"
                title="3.0"
                onPress={() => setPonto2(ponto2 + 3.0)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.25"
                onPress={() => setPonto2(ponto2 + 3.25)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.5"
                onPress={() => setPonto2(ponto2 + 3.5)} />
            </View>
          </View>
          <View style={styles.rows}>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="3.75"
                onPress={() => setPonto2(ponto2 + 3.75)} />
            </View>
            <View
              style={styles.btns}
            >
              <Button
                color="#940104"
                title="4.0"
                onPress={() => setPonto2(ponto2 + 4.0)} />
            </View>
          </View>
          <View style={styles.rowsErr}>
            <Text style={styles.errContagem1}>{execucao2}</Text>
            <View
              style={styles.btnsPenalidade}
            >
              <Button
                color="#42017C"
                title={`Err Exec`}
                onPress={() => ex2()}

              />
            </View>

          </View>

          <View style={styles.rowsErr}>
            <Text style={styles.errContagem1}>{conclusao2}</Text>
            <View
              style={styles.btnsPenalidade}
            >
              <Button
                color="#42017C"
                title={`Err Conc`}
                onPress={() => conc2()}
              />

            </View>

          </View>

        </View>



      </View>


      <View style={styles.parte4}>
        <View
          style={styles.btnZerar}
        >
          <Button
            color="#48474C"
            title="zerar"
            onPress={zerar} />

        </View>
      </View>

      <Modal visible={modalVisible1} >
        <View style={styles.container2} >

          <View style={styles.logoBtnB}>

            <View style={styles.btnB}>

              <Button
                color="#48474C"
                title='Voltar'
                onPress={closeModal1}
              />



              <Button
                color="#48474C"
                title="Limpar Histórico"
                onPress={clearAllItems}
              />





            </View>


            <View style={{ height: 60, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', paddingHorizontal: 15 }}>

              {selectedIds.length > 0 && (
                <View style={{ width: 170, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={deselectAllItems} style={{ width: 50, justifyContent: 'center', display: 'flex', height: 35, borderRadius: 20, width: 35, alignItems: 'center' }}>
                    <Image style={{
                      width: 26,
                      height: 26,
                    }} source={require('../imagens/cross.png')} />

                  </TouchableOpacity>
                  <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center'
                  }}>{`${selectedIds.length} selecionado(s)`}</Text>
                </View>

              )}


              {selectedIds.length > 0 && (
                <TouchableOpacity onPress={removeSelectedItems} style={styles.actionButtonB}>

                  <Text style={{ color: '#CDB3F4', fontSize: 14, borderWidth: 1, borderColor: '#CDB3F4', padding: 9, borderRadius: 20, width: 90, height: 40, textAlign: 'center', justifyContent: 'center', display: 'flex' }}>Excluir</Text>
                </TouchableOpacity>
              )}


            </View>
          </View>



          <FlatList
            style={{ width: '100%', padding: 10 }}
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (



              <View style={styles.placarListB}>

                <View
                  style={{ paddingHorizontal: 20 }}
                >
                  <CheckBox
                    value={selectedIds.includes(item.id)}
                    onValueChange={() => toggleSelectItem(item.id)}
                  />
                </View>

                <View style={styles.placaresB}>
                  <View style={styles.placarB}>
                    <Text style={styles.nomeB}>{item.mc1}</Text>
                    <Text style={styles.pontoB}>Pontos: {item.ponto1}{'\n'}Err Ex: {item.execucao1} {'\n'}Err Cnc: {item.conclusao1}</Text>
                  </View>
                  <View style={styles.centroB}>
                    <Text style={styles.dateB}>
                      <Text>{data}</Text>
                    </Text>


                  </View>
                  <View style={styles.placarB}>
                    <Text style={styles.nomeB}>{item.mc2}</Text>
                    <Text style={styles.pontoB}>Pontos: {item.ponto2}{'\n'}Err Ex: {item.execucao2} {'\n'}Err Cnc: {item.conclusao2}</Text>
                  </View>
                </View>
              </View>

            )}
          />
        </View>
      </Modal>



    </View>
  );

};



const styles = StyleSheet.create({
  modalBackground2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent2: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingTop: 45,
    backgroundColor: '#131313',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    rowGap: 10
  },
  inputEscondido: {
    backgroundColor: 'white'
  },
  parte1: {
    width: '100%',
    rowGap: 13,
    display: 'flex',
    alignItems: 'center'
  },
  save: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnSave: {
    width: 200,
    display: 'flex',
    alignSelf: 'center',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 60,

  },

  input: {
    width: 135,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Torna o input transparente
    color: 'white',
    borderColor: 'transparent', // Remove a borda inicial
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  inputFocused: {
    borderColor: 'transparent', // Remove a borda ao focar
  },
  styledInput: {
    fontSize: 9,
  },
  btn: {
    width: 200,
    paddingVertical: 5
  },

  parte2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  name1: {
    backgroundColor: 'red',
    width: 135,
    display: 'flex',
    height: 55,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name2: {
    backgroundColor: 'blue',
    width: 135,
    display: 'flex',
    height: 55,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placar: {
    width: '100%',
    color: 'white',
    fontSize: 30,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  competidor1: {
    justifyContent: 'center',
    display: 'flex',

  },
  competidor2: {
    justifyContent: 'center',
    display: 'flex',
  },
  open: {
    width: 40,
    height: 40,
  },
  vOpen: {
    width: 40,
    display: 'flex',
    marginBottom: 0
  },
  parte3: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btns: {
    width: 60,
  },

  cols: {
    width: '45%',
    display: 'flex',
    rowGap: 10
  },
  rows: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center'
  },
  parte4: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 5
  },
  rowsErr: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
  },
  btnZerar: {
    width: 300,
    marginTop: 10
  },
  btnsPenalidade: {
    width: 100
  },
  errContagem1: {
    color: 'white',
    backgroundColor: '#42017C',
    width: '20%',
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  container2: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingVertical: 20,
    rowGap: 18,
    backgroundColor: '#131313',
  },
  /*   gradientBorder: {
      width: '100%',
      marginBottom: 20,
      backgroundColor: 'white',
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      padding: 3,
      borderRadius: 10,
      borderStyle: 'solid'
    }, */
  actionButtonB: {
    width: 65,
    height: '20%',
    display: 'flex',
    alignItems: 'center',
  },
  excluirB: {
    width: 25,
    height: 25,
  },
  placarListB: {
    rowGap: 5,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#42017C',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    borderStyle: 'solid'

  },
  placaresB: {
    display: 'flex',
    backgroundColor: '#42017C',
    height: '80%',
    width: '100%',
    padding: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  placarB: {
    alignItems: 'center',
    width: '45%',
    justifyContent: 'center',
  },
  centroB: {
    alignItems: 'center',
    height: '80%',
  },
  /* xB: {
    color: 'bLack',
    fontSize: 40,
    height: '100%'
  }, */
  dateB: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  nomeB: {
    fontSize: 22,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  pontoB: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  logoB: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  btnB: {
    alignSelf: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  btnCont: {
    borderRadius: 20, // Muda o border radius aqui
    overflow: 'hidden', // Necessário para o borderRadius funcionar
  },
  logoBtnB: {
    display: 'flex',
    rowGap: 20,
    width: '100%',
    paddingHorizontal: 15
  },
  container3: {
    width: '100%',
    flex: 1,
    backgroundColor: '#131313'
  },
  contentC: {
    backgroundColor: '#131313',
    padding: 33,
    height: '100%',
    width: '100%'
  },
  opacitC: {
    flex: 1,
    zIndex: 9
  },
  closeC: {
    width: 38,
    height: 38,
    display: 'flex',
    alignSelf: 'flex-start'
  },
  menuC: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 250,
    rowGap: 20,
  },
  btnC: {
    width: '100%'
  }
});