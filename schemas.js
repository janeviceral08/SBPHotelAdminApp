import { ObjectId } from "bson";

class Task {

  constructor({
    room_type,
    name,
    roomprice,
    max_person,
    hour_duration,
    extra_person_charge,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
    rate_mode,
    vacant,
    occupied,
    promo_price_hour,
    roomprice_hour,
    duration_mode,
    promo_duration,
    img,
    temp_id,
    extension,
    hotel_name,
    hotel_address,
    web,
    web_view,
    show_website,
  }) {
    this._partition = partition;
    this._id = id;
    this.roomprice = roomprice;
    this.max_person = max_person;
    this.hour_duration = hour_duration;
    this.extra_person_charge = extra_person_charge;
    this.room_type = room_type;
    this.name = name;
    this.status = status;
    this.rate_mode = rate_mode;
    this.vacant = vacant;
    this.occupied = occupied;
    this.promo_price_hour = promo_price_hour;
    this.roomprice_hour = roomprice_hour;
    this.duration_mode = duration_mode;
    this.promo_duration = promo_duration;
    this.img = img;
    this.temp_id = temp_id;
    this.extension = extension;
    this.hotel_name=hotel_name;
    this.hotel_address=hotel_address;
    this.web = web;
    this.web_view = web_view;
    this.show_website = show_website;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      room_type: "string",
      max_person: "string",
      hour_duration: "string",
      extra_person_charge: "string",
      roomprice: "string",
      status: "string",
      rate_mode: "string",
      web: "string",
      vacant: "int",
      occupied: "int",
      promo_price_hour: "string",
      roomprice_hour: "string",
      duration_mode: "string",
      promo_duration: "string",
      img: "string",
      temp_id: "string",
      extension: "string",
      hotel_address: "string",
      hotel_name: "string",
      web_view: "int",
      show_website: "int"
    },
    primaryKey: "_id",
  };
}


class Room {

  constructor({
    floor,
    name,
    room_type_id,
    partition,
    room_id,
    checkList,
    img,
    note,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.floor = floor;
    this.room_type_id = room_type_id;
    this.name = name;
    this.room_id = room_id;
    this.status = status;
    this.checkList = checkList;
    this.img = img;
    this.note = note;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Rooms",
    properties: {
      _id: "objectId",
      _partition: "string?",
      floor: "string",
      name: "string",
      note: "string",
      room_type_id: "array",
      status: "string",
      room_id: "string",
      checkList: "array",
      img: "array",
    },
    primaryKey: "_id",
  };
}



class Good {
  /**
   *
   * @param {string} price The name of the task
   * @param {string} name The room_type of the task
   * @param {array} product The room_type of the task
   * * @param {array} quantity The room_type of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    price,
    name,
    product,
    partition,
    quantity,
    itemid,
    cat,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.price = price;
    this.product = product;
    this.name = name;
    this.itemid = itemid;
    this.quantity = quantity;
    this.status = status;
    this.cat = cat;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Rooms",
    properties: {
      _id: "objectId",
      _partition: "string?",
      price: "int",
      name: "string",
      product: "string",
      quantity: "int",
      itemid: "string",
      status: "string",
      cat: "string",
    },
    primaryKey: "_id",
  };
}



class Category{
 
  constructor({
    name,
    partition,
    catid,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.catid = catid;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Category",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      catid: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}

class vouchers{
 
  constructor({
    
    partition,
    mode,
    vouchvalue,
    code,
    date,
    expiration_date,
    min_stay,
    max_stay,
    description,
    createdAt,
    updatedAt,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.mode = mode;
    this.vouchvalue = vouchvalue;
    this.code = code;
    this.date = date;
    this.expiration_date = expiration_date;
    this.min_stay = min_stay;
    this.max_stay = max_stay;
    this.max_stay = max_stay;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "vouchers",
    properties: {
      _id: "objectId",
      _partition: "string?",
      status: "string",
      mode: "string",
      vouchvalue: "int",
      code: "string",
      date: "int",
      expiration_date: "int",
      min_stay: "int",
      max_stay: "int",
      description: "string",
      createdAt: "int",
      updatedAt: "int",
    },
    primaryKey: "_id",
  };
}

export { Task,Room, Good, Category, vouchers};
