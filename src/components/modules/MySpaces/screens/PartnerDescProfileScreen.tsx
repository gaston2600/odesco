import { FlatList, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from '../../../../translation/I18n'
import { Divider } from '@rneui/themed'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { editPartner, getMyPartners, getOnePartner } from '../../../../store/actions'
import Icons from '../../../../styles/icons'
import AddFormationModalize from '../../../modals/mySpaces/AddFormationModalize'
import AddFormationModal from '../../../modals/mySpaces/AddFormationModal'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import ExperienceCmp from '../components/ExperienceCmp'
import TrainingCmp from '../components/TrainingCmp'
import { getOneTeacher } from '../../../../store/actions/teachersActions'

const PartnerDescProfileScreen = (props: any) => {
    const dispatch = useDispatch()
    const { partner,
        //  data 
    } = props;
    const [data, setData]: any = useState({})
    const { user } = useSelector((state: any) => state?.User)
    // console.log({ data });

    const refAddFormation = useRef(null)
    const [showAddFormationModal, setShowAddFormationModal] = useState(false)
    const [loadingAddFormation, setLoadingAddFormation] = useState(false)
    const [editAddFormationData, setEditAddFormationData] = useState(null)

    function openAddFormation() {
        setEditAddFormationData(null)
        setTimeout(() => {
            setShowAddFormationModal(true)            
        }, 100);
    }

    function getProfile() {
        dispatch(getOneTeacher({
            teacher: partner
        }, res => {
            console.log("getonePartner", res);
            setData(res?.teacher)

        },
            err => {
                console.log(err);

            }

        ))

        // dispatch(getOnePartner({
        //     partner
        // }, res => {
        //     console.log("getonePartner", res);

        // },
        //     err => {
        //         console.log(err);

        //     }

        // ))
    }
    function checkDataAddFormation(params: any) {
        let msg = ""
        if (!params?.institution) {
            ToastAndroid.show("Nom", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.diplome) {
            ToastAndroid.show("diplome", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.startDate) {
            ToastAndroid.show("startDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.endDate) {
            ToastAndroid.show("endDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (moment(params?.endDate)?.isBefore(moment(params?.startDate))) {
            ToastAndroid.show("Vérifer date", ToastAndroid.SHORT)
            msg = "err"
        }
        else {
            msg = ""
        }
        return msg
    }
    function submitAddFromation(params: {
        institution: string,
        diplome: string,
        startDate: Date,
        endDate: Date,
    }) {
        if (!!checkDataAddFormation(params)) {
        }
        else {
            setLoadingAddFormation(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            trainings: [...data?.trainings, params]
                        }
                    },
                    (res: any) => {
                        console.log("success edit trainings", res);
                        setShowAddFormationModal(false)
                        setLoadingAddFormation(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddFormation(false)
                    }
                )
            )


        }
    }

    function editAddFormation(params: any) {
        if (!!checkDataAddFormation(params)) {
        }
        else {
            console.log({
                partner,
                data: {
                    trainings: data?.trainings?.map((v: any) => {
                        if (v?._id === params?._id) return params
                        else return v
                    })
                }
            });

            setLoadingAddFormation(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            trainings: data?.trainings?.map((v: any) => {
                                if (v?._id === params?._id) return params
                                else return v
                            })
                        }
                    },
                    (res: any) => {
                        console.log("success edit trainings", res);
                        setShowAddFormationModal(false)
                        setLoadingAddFormation(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddFormation(false)
                    }
                )
            )


        }
    }
    function editTraining(params: any) {
        setEditAddFormationData(params)
        setShowAddFormationModal(true)
    }
    function deleteFomation(params: any) {
        setLoadingAddFormation(true)
        dispatch(
            editPartner(
                {
                    partner,
                    data: {
                        trainings: data?.trainings?.filter((v: any) => v?._id !== params?._id)
                    }
                },
                (res: any) => {
                    console.log("success delete trainings", res);
                    setShowAddFormationModal(false)
                    setLoadingAddFormation(false)
                    getProfile()
                },
                (err: any) => {
                    console.log({ err })
                    setLoadingAddFormation(false)
                }
            )
        )
    }

    useEffect(() => {
        getProfile()
    }, [])

    function renderSkills(params: any) {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params}</Text>
                <Divider orientation='horizontal' />
            </View>
        )
    }



    return (
        <ScrollView style={styles.containerStyle}>

            <View style={styles.titleContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold, fontSize: fonts.size.font14 }]}>{`${data?.first_name} ${data?.last_name}`}</Text>
                <Pressable
                    onPress={openAddFormation}
                    style={styles.addIcionContainerStyle}>
                    <Icons.AntDesign name="edit" size={20} color={colors.primary} />
                </Pressable>
            </View>


            {!!data?.email && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"envelope-o"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.email}`}</Text>
            </View>}
            {!!data?.phone && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"phone"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.phone}`}</Text>
            </View>}

            {!!data?.trainings?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("trainings")}</Text>
                        <Pressable
                            onPress={openAddFormation}
                            style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />

                    <FlatList
                        data={data?.trainings}
                        renderItem={({ item }) => <TrainingCmp edit={editTraining} data={item} deleteFormation={deleteFomation} />}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.experiences?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("experiences")}</Text>
                        <Pressable style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    <FlatList
                        data={data?.experiences}
                        renderItem={({ item }) => <ExperienceCmp data={item} />}
                        // renderItem={({ item }) => renderExperience(item)}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.skills?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("skills")}</Text>
                        <Pressable style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    <FlatList
                        data={data?.skills}
                        horizontal
                        renderItem={({ item }) => renderSkills(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
            <AddFormationModal
                visible={showAddFormationModal}
                setVisible={setShowAddFormationModal}
                submit={submitAddFromation}
                loading={loadingAddFormation}
                editData={editAddFormationData}
                edit={editAddFormation}
            />
        </ScrollView>
    )
}

export default PartnerDescProfileScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
    },
    sectionTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
        // marginLeft: 15
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemStyle: {
        flexDirection: "row",
    },
    itemContainerStyle: {
        padding: 10,
        marginTop: 5,
        flex: 9
    },
    sectionContainerStyle: {
        marginVertical: 5
    },
    titleContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    addIcionContainerStyle: {
        padding: 5
    },
    iconDescStyle: {
        marginRight: 10
    },
    editIconContainerStyle: {
        padding: 5,
        flex: 1
    }

})