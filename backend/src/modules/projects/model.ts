import { ProjectI } from "@modules/projects/interfaces";
import { ModelType } from "@modules/interfaces";
import { paginate } from "@utils/paginate";
import { Schema, model } from "mongoose";

const permissions = {
  st: false,
  d: false,
  m: false,
  u: false,
  r: false,
  c: false,
  a: false,
  s: true,
};

const PermissionsShema = new Schema(
  {
    st: Boolean,
    d: Boolean,
    m: Boolean,
    u: Boolean,
    r: Boolean,
    c: Boolean,
    s: Boolean,
  },
  { _id: false }
);

const GroupShema = new Schema(
  {
    permissions: PermissionsShema,
    _id: String,
    email: String,
  },
  { _id: false }
);

const ShareSchema = new Schema(
  {
    public: {
      permissions: PermissionsShema,
      password: String,
      status: Boolean,
    },
    private: {
      group: [GroupShema],
      password: String,
      status: Boolean,
    },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    share: {
      type: ShareSchema,
      default: {
        public: {
          password: null,
          status: false,
          permissions,
        },
        private: {
          group: [],
          password: null,
          status: false,
        },
      },
    },
    password: String,
    title: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strictQuery: false,
    query: {
      paginate: paginate<ProjectI>,
    },
  }
);

export default model<ProjectI, ModelType<ProjectI>>("Projects", ProjectSchema);
