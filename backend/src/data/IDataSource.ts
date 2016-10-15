
interface IDataSource<T> {
    getAll(): Array<T>;
}

export default IDataSource;