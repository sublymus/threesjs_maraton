let i =0;
class UidGenerator {

    generateUid(): string {
        return Date.now() + "_" + Number((++i)+Math.trunc(Math.random() * 9e9 + 1e6)).toString(36);
    }

    validatedUid(uid?: string): boolean {

        return !!uid;
    }

}

export default UidGenerator;