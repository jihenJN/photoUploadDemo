package com.photo.upload.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.photo.upload.domain.Plate} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlateDTO implements Serializable {

    private String id;

    private String name;

    private String photo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlateDTO)) {
            return false;
        }

        PlateDTO plateDTO = (PlateDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, plateDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlateDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", photo='" + getPhoto() + "'" +
            "}";
    }
}
