import { compress } from "@mongodb-js/zstd";

const MIN_COMPRESSION_SIZE = 100;

export async function myCompress(data: string): Promise<string> {
  // Skip compression for small data to avoid overhead
  if (data.length <= MIN_COMPRESSION_SIZE) {
    return data;
  }

  try {
    const buffer = Buffer.from(data, "utf-8");
    const compressed = await compress(buffer, 3);

    return Buffer.from(compressed).toString("base64");
  } catch (e) {
    console.error(`Failed to compress data: ${(e as Error).message}`);
    // Return original data if compression fails
    return data;
  }
}
