
CREATE OR REPLACE FUNCTION insert_otc() RETURNS trigger AS $$
    BEGIN
        IF EXISTS (SELECT * FROM onetimecodes WHERE otc = NEW.otc AND usages = 1) THEN 
            DELETE FROM otc WHERE onetimecode = NEW.otc; 
            RETURN NEW;
        END IF; 
        UPDATE otc SET usages = usages - 1 WHERE onetimecode = NEW.otc;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER otc_insert INSTEAD OF UPDATE ON onetimecodes
    FOR EACH ROW EXECUTE FUNCTION insert_otc();
