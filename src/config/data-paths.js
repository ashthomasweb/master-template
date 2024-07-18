class DataPaths {
    base = {
        users: 'users',
    }

    extension = {
        set: 'set',
        category: 'category',
        entry: 'entry',
        tags: 'tags',
        quizzes: 'quizzes'
    }

    globalBasePath = this.base.users
    globalExtensionPath = this.extension.set
}

export default new DataPaths()