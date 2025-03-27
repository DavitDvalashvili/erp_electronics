DELIMITER //

CREATE TRIGGER notification_trigger_after_update
AFTER UPDATE ON components
FOR EACH ROW
BEGIN
    IF NEW.required_quantity < NEW.available_quantity THEN
        -- Avoid duplicate notifications
        IF NOT EXISTS (
            SELECT 1 FROM notifications WHERE component_id = NEW.id
        ) THEN
            INSERT INTO notifications (component_id, status, created_at)
            VALUES (NEW.id, TRUE, NOW());
        END IF;
    END IF;
END;

//

DELIMITER ;