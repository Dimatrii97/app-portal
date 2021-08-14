//  singolton
class Util {

    constructor() {
        // прото vue;
    }

    groopByToMap(list, params = 'id') {
        if (!list) {
            throw new Error("Ошибка, groopByToMap передан пустой список")
        }

        return list.reduce((acc, it) => {
            acc[params] = it
        }, {});
    }
}
