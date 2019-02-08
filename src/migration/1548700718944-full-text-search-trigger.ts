import {MigrationInterface, QueryRunner} from "typeorm";

export class fullTextSearchTrigger1548700718944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TRIGGER tsvectorupdateSearchField BEFORE INSERT OR UPDATE
        ON reviews FOR EACH ROW EXECUTE PROCEDURE
        tsvector_update_trigger(search_field, 'pg_catalog.english',title, property_type, property_name, address, city, state, zip, country);`);
   
        await queryRunner.query(`CREATE INDEX reviewSearchField_idx ON reviews USING GIN(search_field);`);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER "tsvectorupdateSearchField";`);
    }

}
