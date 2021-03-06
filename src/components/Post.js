import React, { useState } from "react";
import PDF from "./PDF";
import "./Post.css";
const Post = () => {
  const [submited, setSubmited] = useState(false);
  const [form, setForm] = useState([
    {
      quantity: "",
      prix: "",
      tva: "",
      discount: "",
      HT: "",
      TTC: "",
      description: "",
    },
  ]);
  const [general, setGenerale] = useState({});

  const calcule = (i) => {
    let TTC = 0;
    let HT = 0;
    let newFormValues = [...form];
    if (newFormValues[i]["quantity"] && newFormValues[i]["prix"]) {
      TTC = newFormValues[i]["quantity"] * newFormValues[i]["prix"];
      HT = TTC;
    }
    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["discount"] &&
      !newFormValues[i]["tva"]
    ) {
      TTC =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] -
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["discount"]) /
          100;

      HT = TTC;
    }

    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      !newFormValues[i]["discount"]
    ) {
      TTC =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] +
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["tva"]) /
          100;
    }
    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      newFormValues[i]["discount"]
    ) {
      HT =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] -
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["discount"]) /
          100;
      TTC = HT + (HT * newFormValues[i]["tva"]) / 100;
    }
    return { TTC, HT };
  };
  const calculeGenerale = (e) => {
    let TTC = [];
    let THT = [];
    let RemiseGeneral = 0;
    let THTF = 0;
    let TVAG = [];

    let newFormValues = [...form];
    let value = Object.values(newFormValues);

    value.map((item) => THT.push(item.HT));
    THT = THT.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    THTF = THT;
    value.map((item) => TTC.push(item.TTC));
    TTC = TTC.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    if (e) {
      TTC = TTC - (TTC * e.target.value) / 100;
      THTF = THT - (THT * e.target.value) / 100;
    }
    TVAG = TTC - THT;

    const global = {
      THT,
      TTC,
      TVAG,
      THTF,
      RemiseGeneral,
    };
    setGenerale(global);
  };

  let handleChange = async (i, e) => {
    let newFormValues = [...form];
    newFormValues[i][e.target.name] = e.target.value;
    const { TTC, HT } = await calcule(i);
    // newFormValues[i]["HT"] = (Math.round(HT * 100) / 100).toFixed(2);
    // newFormValues[i]["TTC"] = (Math.round(TTC * 100) / 100).toFixed(2);
    newFormValues[i]["HT"] = HT;
    newFormValues[i]["TTC"] = TTC;
    setForm(newFormValues);
    await calculeGenerale();
  };

  let addFormFields = () => {
    setForm([
      ...form,
      {
        quantity: "",
        prix: "",
        tva: "",
        discount: "",
        HT: "",
        TTC: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...form];
    newFormValues.splice(i, 1);
    setForm(newFormValues);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(form));
  };

  return (
    <>
      <div className='container'>
        <form className='simple_form form edit_quotation'>
          <div className='recipient-selected transition visible'>
            <fieldset>
              <legend>Articles</legend>
              {form.map((item, index) => (
                <div key={index} className='rail mt'>
                  <div className='nested-item station'>
                    <div className='station-sign station-sign-counter' />

                    <div generalclassName='station-content'>
                      <div className='row'>
                        <div className='col-lg-11'>
                          <div className='row'>
                            <div className='col-lg-6'>
                              <div className='field select optional quotation_items_item_type'>
                                <div className='select optional selection dropdown float-label'>
                                  <select data-controller='floating-label-input dropdown'>
                                    <option value=''>S??lectionner</option>
                                    <option value={1}>Acompte</option>
                                    <option value={4}>Heures</option>
                                    <option value={5}>Jours</option>
                                    <option value={2}>Produit</option>
                                    <option value={3}>Service</option>
                                  </select>
                                  <i className='dropdown icon' />
                                  <div className='text'>Service</div>
                                </div>
                                <label
                                  className='select optional'
                                  htmlFor='quotation_items_attributes_0_item_type_id'>
                                  Type
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='flex-fields d-block d-md-flex'>
                            <div className='field decimal optional quotation_items_quantity'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                name='quantity'
                                value={item.quantity || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_quantity'>
                                Quantit??
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_unit_price'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                name='prix'
                                value={item.prix || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_unit_price'>
                                Prix HT
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_tax'>
                              <input
                                className='numeric decimal optional float-label'
                                data-controller='floating-label-input'
                                type='number'
                                name='tva'
                                value={item.tva || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_tax'>
                                TVA
                              </label>
                            </div>
                            <div className='fields-group'>
                              <div className='field decimal optional quotation_items_reduction w-100'>
                                <input
                                  className='numeric decimal optional float-label'
                                  type='number'
                                  step='any'
                                  name='discount'
                                  value={item.discount || ""}
                                  onChange={(e) => handleChange(index, e)}
                                />
                                <label
                                  className='decimal optional'
                                  htmlFor='quotation_items_attributes_0_reduction'>
                                  R??duction
                                </label>
                              </div>
                              <div className='field select optional quotation_items_reduction_unit'>
                                <div
                                  className='select optional selection dropdown item-reduction-unit float-label'
                                  tabIndex={0}>
                                  <select data-controller='floating-label-input dropdown'>
                                    <option value='' label=' ' />
                                    <option value='percent'>%</option>
                                    <option value='currency'>???</option>
                                  </select>
                                  <i className='dropdown icon' />
                                  <div className='text'>???</div>
                                  <div className='menu' tabIndex={-1}>
                                    <div className='item' data-value='percent'>
                                      %
                                    </div>
                                    <div
                                      className='item active selected'
                                      data-value='currency'>
                                      ???
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='field decimal optional disabled quotation_items_price_pretax'>
                              <input
                                className='numeric decimal optional disabled float-label'
                                disabled=''
                                type='number'
                                name='HT'
                                value={item.HT || ""}
                              />
                              <label
                                className='decimal optional disabled'
                                htmlFor='quotation_items_attributes_0_price_pretax'>
                                Total HT
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_price'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                value={item.TTC || ""}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_price'>
                                Total TTC
                              </label>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='field text optional quotation_items_description'>
                                <textarea
                                  rows={2}
                                  className='text optional'
                                  placeholder='description'
                                  name='description'
                                  value={item.description || ""}
                                  onChange={(e) => handleChange(index, e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className='row'>
                <div className='col-xs-12'>
                  <a
                    className='button-flat button-flat-primary add_fields'
                    onClick={() => addFormFields()}>
                    Ajouter une ligne
                  </a>
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-lg-7' />
              <div className='col-lg-3'>
                <div className='field decimal optional quotation_reduction'>
                  <input
                    data-model='document.global-reduction'
                    className='numeric decimal optional float-label'
                    type='number'
                    name='general'
                    max={100}
                    min={0}
                    onChange={(e) => calculeGenerale(e)}
                  />
                  <label
                    className='decimal optional'
                    htmlFor='quotation_reduction'>
                    Remise g??n??rale
                  </label>
                </div>
              </div>
              <div className='col-lg-1'>
                <div className='field select optional quotation_reduction_unit'>
                  <div
                    className='select optional selection dropdown global-reduction-unit float-label'
                    tabIndex={0}>
                    <select
                      data-controller='floating-label-input dropdown'
                      name='quotation[reduction_unit]'
                      id='quotation_reduction_unit'>
                      <option value='' label=' ' />
                      <option value='percent'>%</option>
                      <option value='currency'>???</option>
                    </select>
                    <i className='dropdown icon' />
                    <div className='text'>%</div>
                    <div className='menu' tabIndex={-1}>
                      <div
                        className='item active selected'
                        data-value='percent'>
                        %
                      </div>
                      <div className='item' data-value='currency'>
                        ???
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-11'>
                <div className='item-summary'>
                  <dl className='dl-items'>
                    <dt>Total HT</dt>
                    <dd data-bind='document.pricePretax'>{general.THT} ???</dd>
                    <dt>Remise g??n??rale</dt>
                    <dd data-bind='document.globalReductionAmount'>
                      {general.RemiseGeneral} ???
                    </dd>
                    <dt>Total HT final</dt>
                    <dd data-bind='document.pricePretaxWithGlobalReduction'>
                      {general.THTF} ???
                    </dd>
                    <dt>TVA</dt>
                    <dd data-bind='document.tax'>{general.TVAG} ???</dd>
                    <dt>Total</dt>
                    <dd data-bind='document.price'>{general.TTC}???</dd>
                  </dl>
                </div>
              </div>
            </div>

            <button
              type='button'
              onClick={setSubmited}
              className='button button button-large button-green'>
              Imprimer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
