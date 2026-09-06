// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// //import { Link as RouterLink } from 'react-router-dom'; // Importa React Router per Web
//
// // Definizione dei parametri di navigazione per React Navigation (Mobile)
// type RootStackParamList = {
//   Login: undefined;
//   ResetPassword: undefined;
// };
//
// // Tipo del componente Link
// export interface LinkProps {
//   toApp?: keyof RootStackParamList;  // Su mobile: uno dei nomi di schermata. Su web: una stringa con il percorso.
//   to?: string; // Su mobile: uno dei nomi di schermata. Su web: una stringa con il percorso.
//   label: string; // Il testo del link
//   testID?: string; // ID per i test
//   //param?: { email: string }; // Parametro opzionale (solo per mobile)
// }
//
// const Link: React.FC<LinkProps> = ({ to, toApp, label, testID }) => {
//   // Se siamo su React Native (Mobile), usiamo React Navigation
//   // Se siamo su web, usiamo React Router per navigare
//   if (Platform.OS === 'web') {
//     return (
//       <Link to={to || '#'} style={styles.link}>
//         <Text style={styles.linkText}>{label}</Text>
//       </Link>
//     );
//   }
//
//   const navigation = useNavigation();
//   const handlePress = () => {
//     // Se siamo su mobile, naviga usando React Navigation
//     if (Platform.OS !== 'web') {
//       // Navigazione senza parametri
//       if (toApp) {
//         navigation.navigate(toApp);
//       }
//     }
//   };
//   // Se siamo su mobile (React Native), usa TouchableOpacity
//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.link} testID={testID}>
//       <Text style={styles.linkText}>{label}</Text>
//     </TouchableOpacity>
//   );
// };
//
// const styles = StyleSheet.create({
//   link: {
//     marginTop: 16,
//   },
//   linkText: {
//     color: '#007bff', // Colore del link (sostituisci con il tuo colore primario)
//     textDecorationLine: 'underline', // Simula l'undeline (equivalente a `text-decoration-none`)
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
//
// export default Link;
