package com.cuidarmais.demo.Entities.EntitiyObjects;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {

    private String zip;

    private String street;

    private String number;

    private String suite;

    private String city;

    private String district;

    private String state;

    public Address() {};

    public Address(String zip, String street, String number, String suite, String city, String district, String state) {
        this.zip = zip;
        this.street = street;
        this.number = number;
        this.suite = suite;
        this.city = city;
        this.district = district;
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSuite() {
        return suite;
    }

    public void setSuite(String suite) {
        this.suite = suite;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Address [zip=" + zip + ", street=" + street + ", number=" + number + ", suite=" + suite + ", city="
                + city + ", district=" + district + ", state=" + state + "]";
    }

}
