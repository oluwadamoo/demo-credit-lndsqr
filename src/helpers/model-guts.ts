
export default (
    {
        knex = {},
        name = 'name',
        tableName = 'tablename',
        selectableProps = [],
        timeout = 1000
    }: any) => {

    const create = (props: any) => {
        delete props.id;

        return knex.insert(props)
            .returning(selectableProps)
            .into(tableName)
            .timeout(timeout)
    }

    const findAll = () => knex.select(selectableProps)
        .from(tableName)
        .timeout(timeout)

    const find = (filters: any) => knex.select(selectableProps)
        .from(tableName)
        .where(filters)
        .timeout(timeout)

    const findOne = (filters: any) => find(filters).then((results: any[]) => {
        if (!Array.isArray(results)) return results
        return results[0]
    })

    const findById = (id: number) => knex.select(selectableProps)
        .from(tableName)
        .where({ id })
        .timeout(timeout)

    const update = (id: number, props: any) => {
        delete props.id;

        return knex.update(props)
            .from(tableName)
            .where({ id })
            .returning(selectableProps)
            .timeout(timeout)
    }

    const destroy = (id: number) => knex.del().from(tableName).where({ id }).timeout({ timeout })

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy
    }
}
