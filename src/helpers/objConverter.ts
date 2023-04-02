import User from "../database/model/User";

// export const getObjFromFeilds: any = function (baseObject: any, feildsToHave: Array<string>) {
//     const objectToSend : Record<string, any> = {};
//     feildsToHave.forEach(element => {
//         objectToSend.set(element, baseObject[element]);
//     });
//     return objectToSend;
//   }
export const getUserForResponse = function (user: User): Object {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      authMethod: user.authMethod,
    };
  }