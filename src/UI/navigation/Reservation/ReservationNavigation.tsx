import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReservationListContainer from "../../containers/ReservationList/ReservationListContainer";

type Props = {};

const ReservationNavigation = (props: Props) => {
  const ReservationStack = createNativeStackNavigator();

  return (
    <ReservationStack.Navigator
      initialRouteName="ReservationList"
      screenOptions={{ headerShown: false }}
    >
      <ReservationStack.Screen
        name="ReservationList"
        component={ReservationListContainer}
      />
    </ReservationStack.Navigator>
  );
};

export default ReservationNavigation;