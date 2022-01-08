import Layout from "../components/layout";
import Image from "next/image";
import styles from '../styles/Nosotros.module.css'

export default function Nosotros() {
  return (
    <Layout pagina="Nosotros">
      <main className="contenedor">
        <h2 className="heading">Nosotros</h2>
        <div className={styles.nosotros}>
          <Image
            layout="responsive"
            width={600}
            height={400}
            src="/img/nosotros.jpg"
          />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            convallis urna ac ligula faucibus bibendum. Sed molestie ac nisi
            lacinia tincidunt. Fusce tincidunt, diam eget auctor molestie, erat
            ex blandit massa, non pulvinar nulla odio ullamcorper metus.
            Curabitur euismod sapien ut sem bibendum mollis in ornare ante.
            Mauris tincidunt in leo sit amet molestie. Suspendisse tincidunt
            efficitur efficitur. Morbi auctor nisi eu nulla consectetur, vel
            auctor ante ornare. Sed suscipit ornare feugiat. Suspendisse egestas
            molestie felis, ac auctor massa aliquet a. Pellentesque quis
            hendrerit neque, eget efficitur lorem. Sed scelerisque nec quam id
            consectetur. Nullam at laoreet sem, ut dictum sapien. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Etiam enim lacus, pretium ultricies arcu in,
            consectetur malesuada ipsum. Aliquam erat volutpat. Aenean pharetra
            vulputate urna, eu vulputate ligula vehicula nec. Donec in sodales
            elit. Morbi vitae risus sagittis arcu convallis varius. Sed mollis
            justo ut velit tincidunt, ut maximus nisl vestibulum.
          </p>
        </div>
      </main>
    </Layout>
  );
}
