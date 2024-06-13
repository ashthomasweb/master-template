export class User {
    constructor(first, last) {
        this.first = first
        this.last = last
    }
}

export class Set {
    constructor(id, title, subtitle, categories) {
        this.id = id
        this.title = title
        this.subittle = subtitle
        this.categories = categories
    }
}

export class Category {
    constructor(id, title, subtitle, entries) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.entries = entries
    }
}

export class Entry {
    constructor(id, title, subtitle, description, set, category, tags, count ) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.description = description
        this.set = set
        this.category = category
        this.tags = tags
        this.count = count
    }
}

export class Tag {
    constructor(id, title, taggedEntries) {
        this.id = id
        this.title = title
        this.taggedEntries = taggedEntries
    }
}

export class Quiz {
    constructor(id, title, set, categories, tags, count) {
        this.id = id
        this.title = title
        this.set = set
        this.categories = categories
        this.tags = tags
        this.count = count
    }
}

export class Count {
    constructor(completed, scores, viewed, correct, incorrect) {
        this.completed = completed
        this.scores = scores
        this.viewed = viewed
        this.correct = correct
        this.incorrect = incorrect
    }
}



