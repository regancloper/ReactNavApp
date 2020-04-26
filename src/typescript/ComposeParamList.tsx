import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ComposeParamList = {
    Compose: undefined;
    ComposeResult:undefined;
};

export type ComposeStackNavProps<T extends keyof ComposeParamList> = {
    navigation: StackNavigationProp<ComposeParamList, T>;
    route: RouteProp<ComposeParamList, T>;
};
