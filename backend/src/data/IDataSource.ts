/**
 * Interface that all the datastores must implement
 */
interface IDataSource<T> {
    // Returns all the stored items from the store
    getAll(): Array<T>;
}

export default IDataSource;