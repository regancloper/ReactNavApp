import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type HomeParamList = {
    Feed: undefined;
    Product: {
        name: string;
    };
    EditProduct: {
        name: string;
        submit?: React.MutableRefObject<() => void>;
    };
    AllBlogs: undefined;
    SingleBlog: {
        itemId: number
    };
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
};
