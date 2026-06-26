/* eslint-disable no-unused-expressions */
import Field from '../models/Field.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {get} /fields Get all fields
 * @apiName getAllFields
 * @apiGroup Fields
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*   [{
        "_id": "658014209c2f2cb5c581307a",
        "categoryName": "General tags",
        "tagAmount": 15,
        "parent": null,
        "templateLink": null,
        "tags": [
            {
                "options": [],
                "_id": "658ae912701d9ba37843799d",
                "tag": "Id",
                "fieldLink": null,
                "required": "Required",
                "title": "ID"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba37843799e",
                "tag": "AvitoId",
                "fieldLink": null,
                "required": "Optional",
                "title": "Ad number for linking"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba37843799f",
                "tag": "DateBegin",
                "fieldLink": null,
                "required": "Optional",
                "title": "Publication date and time"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a0",
                "tag": "Title",
                "fieldLink": null,
                "required": "Required",
                "title": "Title"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a1",
                "tag": "Description",
                "fieldLink": null,
                "required": "Required",
                "title": "Description"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a2",
                "tag": "Price",
                "fieldLink": null,
                "required": "Required",
                "title": "Price"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a3",
                "tag": "Images",
                "fieldLink": null,
                "required": "Required",
                "title": "Photo link(s)"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a4",
                "tag": "VideoURL",
                "fieldLink": null,
                "required": "Optional",
                "title": "Video link"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a5",
                "tag": "Address",
                "fieldLink": null,
                "required": "Required",
                "title": "Address"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a6",
                "tag": "ContactPhone",
                "fieldLink": null,
                "required": "Optional",
                "title": "Phone"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a7",
                "tag": "ManagerName",
                "fieldLink": null,
                "required": "Optional",
                "title": "Manager"
            },
            {
                "_id": "658ae912701d9ba3784379a8",
                "tag": "ContactMethod",
                "fieldLink": null,
                "required": "Optional",
                "title": "Contact method",
                "options": [
                    "By phone and in messages",
                    "By phone",
                    "In messages"
                ]
            },
            {
                "_id": "658ae912701d9ba3784379a9",
                "tag": "ListingFee",
                "fieldLink": null,
                "required": "Optional",
                "title": "Listing method",
                "options": [
                    "Package",
                    "PackageSingle",
                    "Single"
                ]
            },
            {
                "_id": "658ae912701d9ba3784379aa",
                "tag": "AdStatus",
                "fieldLink": null,
                "required": "Optional",
                "title": "Promotion service",
                "options": [
                    "Free",
                    "Highlight",
                    "XL",
                    "x2_1",
                    "x2_7",
                    "x5_1",
                    "x5_7",
                    "x10_1",
                    "x10_7",
                    "x15_1",
                    "x15_7",
                    "x20_1",
                    "x20_7"
                ]
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379ab",
                "tag": "Stock",
                "fieldLink": null,
                "required": "Optional",
                "title": "Remaining"
            }
        ]
    }]
 */
export const getAllFieldsController = (req, res) => {
  try {
    Field.find().then((fields) => {
      res.status(200).json(fields);
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /fields/:category Get field by category
 * @apiName getFieldbyCategory
 * @apiGroup Fields
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*   [{
        "_id": "658014209c2f2cb5c581307a",
        "categoryName": "General tags",
        "tagAmount": 15,
        "parent": null,
        "templateLink": null,
        "tags": [
            {
                "options": [],
                "_id": "658ae912701d9ba37843799d",
                "tag": "Id",
                "fieldLink": null,
                "required": "Required",
                "title": "ID"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba37843799e",
                "tag": "AvitoId",
                "fieldLink": null,
                "required": "Optional",
                "title": "Ad number for linking"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba37843799f",
                "tag": "DateBegin",
                "fieldLink": null,
                "required": "Optional",
                "title": "Publication date and time"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a0",
                "tag": "Title",
                "fieldLink": null,
                "required": "Required",
                "title": "Title"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a1",
                "tag": "Description",
                "fieldLink": null,
                "required": "Required",
                "title": "Description"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a2",
                "tag": "Price",
                "fieldLink": null,
                "required": "Required",
                "title": "Price"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a3",
                "tag": "Images",
                "fieldLink": null,
                "required": "Required",
                "title": "Photo link(s)"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a4",
                "tag": "VideoURL",
                "fieldLink": null,
                "required": "Optional",
                "title": "Video link"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a5",
                "tag": "Address",
                "fieldLink": null,
                "required": "Required",
                "title": "Address"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a6",
                "tag": "ContactPhone",
                "fieldLink": null,
                "required": "Optional",
                "title": "Phone"
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379a7",
                "tag": "ManagerName",
                "fieldLink": null,
                "required": "Optional",
                "title": "Manager"
            },
            {
                "_id": "658ae912701d9ba3784379a8",
                "tag": "ContactMethod",
                "fieldLink": null,
                "required": "Optional",
                "title": "Contact method",
                "options": [
                    "By phone and in messages",
                    "By phone",
                    "In messages"
                ]
            },
            {
                "_id": "658ae912701d9ba3784379a9",
                "tag": "ListingFee",
                "fieldLink": null,
                "required": "Optional",
                "title": "Listing method",
                "options": [
                    "Package",
                    "PackageSingle",
                    "Single"
                ]
            },
            {
                "_id": "658ae912701d9ba3784379aa",
                "tag": "AdStatus",
                "fieldLink": null,
                "required": "Optional",
                "title": "Promotion service",
                "options": [
                    "Free",
                    "Highlight",
                    "XL",
                    "x2_1",
                    "x2_7",
                    "x5_1",
                    "x5_7",
                    "x10_1",
                    "x10_7",
                    "x15_1",
                    "x15_7",
                    "x20_1",
                    "x20_7"
                ]
            },
            {
                "options": [],
                "_id": "658ae912701d9ba3784379ab",
                "tag": "Stock",
                "fieldLink": null,
                "required": "Optional",
                "title": "Remaining"
            }
        ]
    }]
 */
export const getFieldByCategoryController = async (req, res) => {
  const { category } = req.params;

  try {
    const field = await Field.findOne({ categoryName: category });
    field
      ? res.status(200).json(field)
      : res.status(404).end('field not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /tags_from_fields Get tags from fields
 * @apiName getTagsFromFields
 * @apiGroup Fields
 */
export const getTagsFromFieldsController = async (req, res) => {
  try {
    const resultTags = await Field.find().then((fields) => {
      const uniqTags = fields.reduce((acc, field) => {
        const { tags } = field;
        tags.forEach(({ tag }) => acc.add(tag));
        return acc;
      }, new Set());
      return Array.from(uniqTags);
    });
    res.status(200).send(resultTags);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getFieldByFullnameController = async (req, res) => {
  const { fullName } = req.params;
  const preparedFullname = fullName.split('_').join('/');
  try {
    const field = await Field.findOne({ fullName: preparedFullname });
    field
      ? res.status(200).json(field)
      : res.status(404).end('field not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
