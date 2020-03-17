import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          CreatePlan: 'createPlan',
          PlanList: 'myPlans',
          Profile: 'profile',
          Login: 'login',
          Register: 'register'
        },
      }
    },
  });
}
