import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FordoService } from '../../service/fordo.service';
import { contentThng } from '../../interfaces/thing.interface';
import Thing from '../../interfaces/thing.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  public Formulario: FormGroup;

  public Things: contentThng[];

  constructor(private Servicefordo: FordoService) {
    this.ShowThings();
  }

  ngOnInit() {
    this.crearFormulario()
  }

  private crearFormulario() {
    this.Formulario = new FormGroup({
      thing: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  public ObtenerThings() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true

    })

    // console.log(this.Formulario.value);
    this.Servicefordo.PostThing(this.Formulario.value).subscribe(
      (data) => {
        // console.log(data);
        Toast.fire({
          icon: 'success',
          title: 'Guardado correctamente'
        })
        this.Formulario.reset();
      }
    )
  }

  public ShowThings() {
    this.Servicefordo.getThing().subscribe(
      (data: Thing) => {
        this.Things = data.Things
        console.log(this.Things);
      }
    )
  }

  public CambiarStatus(thing: contentThng) {
    thing.complete = !thing.complete;
    this.Servicefordo.putThing(thing).subscribe(

      //Se obtiene la informacion    ()=> {}
      //Error si el subscribe marca un error, error=>{}

      (data) => { },
      error => {
        console.log(error.statusText);
      }

    );
  }

  public EliminarTarea(thingId) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.Servicefordo.DeleteThing(thingId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        );
      }
    })
  }
}
