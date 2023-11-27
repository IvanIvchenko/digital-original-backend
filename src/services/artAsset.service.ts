import { knex } from 'config/db'
import { ArtAsset } from 'utils/interfaces';
import { ResponseError } from 'utils/responseError';

export class ArtAssetService {
  async findOne(id: number): Promise<ArtAsset> {
    const artAsset = await knex
    .select<ArtAsset>(
      'art_assets_main.name_original as name_original',
      'art_assets_main.name_english as name_english',
      'art_assets_main.description',
      'art_assets_main.price',
      knex.raw(`json_agg(DISTINCT files.filename_disk) as files`),
      knex.raw(
          `(
              SELECT json_agg(json_build_object('name_original', other_art_assets.name_original))
              FROM (
                  SELECT aa.name_original
                  FROM art_assets as aa
                  JOIN artists_art_assets AS aa_artists ON aa.id = aa_artists.art_assets_id
                  WHERE aa_artists.artists_id IN (
                      SELECT artists_id 
                      FROM artists_art_assets 
                      WHERE art_assets_id = art_assets_main.id
                  ) 
                  AND aa.id != art_assets_main.id
                  ORDER BY RANDOM()
                  LIMIT 4
              ) AS other_art_assets
          ) as more_from_artists`
      ),
      knex.raw(
          `(
              SELECT json_agg(json_build_object(
                  'name', a.name, 
                  'filename_disk', af.filename_disk
              ))
              FROM artists AS a
              JOIN files AS af ON a.photo = af.id
              WHERE a.id IN (
                  SELECT artists_id 
                  FROM artists_art_assets 
                  WHERE art_assets_id = art_assets_main.id
              )
          ) as artists`
      )
  )
  .from('art_assets as art_assets_main')
  .leftJoin('art_assets_files', 'art_assets_main.id', 'art_assets_files.art_assets_id')
  .leftJoin('files', 'art_assets_files.files_id', 'files.id')
  .where('art_assets_main.id', id)
  .groupBy('art_assets_main.id')
  .first();

    if (artAsset) {
      return artAsset;
    } else {
      const err: ResponseError = new Error('Art asset with such id does not exist');
      err.statusCode = 404;
      throw err;
    }
  }
}