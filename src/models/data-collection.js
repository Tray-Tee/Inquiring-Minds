'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try {
      const idNum = parseInt(id);
      let query = { where: { id: idNum }};

      let item = await this.model.findOne(query);

      await this.model.get(query)
      return item
    } catch (e) {
      console.log(e);
      return e
    }
  }

  async get() {
    try {
      let item = await this.model.findAll();
      return item;
    } catch (e) {
      console.log(e);
      return e
    }
  }

  async create(record) {
    try {
      let item = await this.model.create(record);
      return item
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async update(id, data) {
    try {
      const idNum = parseInt(id);
      let query = { where: { id: idNum }};
      let body = { name: data.name }

    return await this.model.update( body, query );
    } catch (err) {
      console.error(err);
      return err
    }
  }

  async delete(id) {
    try {
      const idNum = parseInt(id);
      let query = { where: { id: idNum }};

      let itemToRemove = await this.model.findOne(query);

      await this.model.destroy(query);
      return itemToRemove;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

module.exports = DataCollection;
