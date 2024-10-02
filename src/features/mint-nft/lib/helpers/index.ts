import { NftItemUriTemplate } from "../../constants";
import { TNftItemUri } from "../../types";

export const setNftUri = (formValues: TNftItemUri) => ({...NftItemUriTemplate, ...formValues})