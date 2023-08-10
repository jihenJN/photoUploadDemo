package com.photo.upload.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.photo.upload.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plate.class);
        Plate plate1 = new Plate();
        plate1.setId("id1");
        Plate plate2 = new Plate();
        plate2.setId(plate1.getId());
        assertThat(plate1).isEqualTo(plate2);
        plate2.setId("id2");
        assertThat(plate1).isNotEqualTo(plate2);
        plate1.setId(null);
        assertThat(plate1).isNotEqualTo(plate2);
    }
}
