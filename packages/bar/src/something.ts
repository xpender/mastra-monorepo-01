import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";

export const OTHER_NAME = "OTHER_NAME";

const EMBEDDING_MODEL = "intfloat/multilingual-e5-base" as const;
const TRANSFORMERS_CACHE_DIR = "/usr/local/share/tokenizers" as const;

export class EmbeddingPipeline {
  public embeddingPipeline?: FeatureExtractionPipeline;

  /**
   * Initialize the embedding pipelines by loading the embedding models into memory
   */
  async initialize(): Promise<void> {
    if (this.embeddingPipeline) {
      return;
    }

    this.embeddingPipeline = await pipeline<"feature-extraction">("feature-extraction", EMBEDDING_MODEL, {
      local_files_only: true,
      dtype: "fp32",
      cache_dir: TRANSFORMERS_CACHE_DIR,
    });
  }
}
