import type { Metadata } from "next";
import { Fragment, type CSSProperties } from "react";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageFrame } from "../../components/PageFrame";
import { getProject, projects } from "../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}${project.cover}`;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const videoFirst = Boolean(project.video?.first);
  const isPitchBoard = project.layout === "pitch-board";
  const isPosterWall = project.layout === "poster-wall";
  const standardGallery = isPitchBoard
    ? project.gallery.slice(0, -2)
    : isPosterWall
      ? []
      : project.gallery;
  const pitchSketches = isPitchBoard ? project.gallery.slice(-2) : [];
  const posterFeature = isPosterWall ? project.gallery[0] : undefined;
  const posterSeries = isPosterWall ? project.gallery.slice(1) : [];

  const renderNarrative = (copy: string | string[]) => {
    const paragraphs = Array.isArray(copy) ? copy : [copy];

    return (
      <div className="project-story-paragraphs">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  };

  const renderStreamSection = (
    title: string,
    entranceClass: "page-enter" | "reveal",
  ) => {
    const details = project.sections?.[title];

    return (
      <header
        className={`project-stream-section-label ${entranceClass}${details?.description ? " project-stream-section-label-with-description" : ""}`}
      >
        <span>{details?.label ?? "Marketing campaigns"}</span>
        <div className="project-stream-section-heading">
          <h2>{title}</h2>
          {details?.description ? (
            <div className="project-stream-section-description">
              {(Array.isArray(details.description)
                ? details.description
                : [details.description]
              ).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </header>
    );
  };

  const projectVideo = project.video ? (
    <figure
      className={`project-media-item project-media-video ${videoFirst ? "page-enter" : "reveal"}`}
    >
      <video
        aria-label={project.video.caption}
        autoPlay={project.video.autoPlay}
        controls={!project.video.autoPlay}
        loop={project.video.loop}
        muted
        playsInline
        poster={project.video.poster}
        preload={project.video.autoPlay ? "auto" : "metadata"}
      >
        <source src={project.video.src} />
      </video>
    </figure>
  ) : null;

  return (
    <PageFrame
      theme="light"
      className="project-detail-frame"
      mobileMenuColor={project.accent}
    >
      <article
        className={`project-detail project-layout-${project.layout}`}
        style={{ "--project-accent": project.accent } as CSSProperties}
      >
        <div className="project-case-layout">
          <aside className="project-case-panel">
            <div className="project-case-panel-inner">
              <a className="page-enter project-back-link" href="/work">
                Back to projects
              </a>
              <header className="project-heading">
                <p className="page-enter section-label">{project.category}</p>
                <h1 className="page-enter portfolio-display-title project-detail-title">
                  {project.title}
                </h1>
                <p className="page-enter project-summary">{project.summary}</p>
              </header>

              <dl className="page-enter project-meta">
                <div>
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
              </dl>

              <section className="page-enter project-story">
                <div className="project-story-copy">
                  <h2>The insight</h2>
                  {renderNarrative(project.insight)}
                </div>
                {project.idea ? (
                  <div className="project-story-copy project-story-idea">
                    <h2>The idea</h2>
                    {renderNarrative(project.idea)}
                  </div>
                ) : null}
                <div className={`project-story-copy${project.idea ? " project-story-copy-wide" : ""}`}>
                  <h2>The approach</h2>
                  {renderNarrative(project.approach)}
                </div>
                {project.impact ? (
                  <div className="project-story-copy project-story-copy-wide">
                    <h2>The impact</h2>
                    {renderNarrative(project.impact)}
                  </div>
                ) : null}
              </section>
            </div>
          </aside>

          <div className="project-media-stream">
            <a
              className="project-adjacent-link previous-project page-enter"
              href={`/work/${previousProject.slug}`}
              aria-label={`Previous project: ${previousProject.title}`}
            >
              <span className="project-adjacent-copy">
                <span className="project-adjacent-label">Previous project</span>
                <strong>{previousProject.shortTitle}</strong>
              </span>
              <span
                className={`project-adjacent-thumbnail${previousProject.coverFit === "contain" ? " project-adjacent-thumbnail-contain" : ""}`}
              >
                <Image
                  src={previousProject.cover}
                  alt=""
                  width={previousProject.coverWidth ?? 1400}
                  height={previousProject.coverHeight ?? 788}
                  sizes="(max-width: 767px) 34vw, 15vw"
                />
              </span>
            </a>

            {videoFirst ? projectVideo : null}

            {!videoFirst && project.coverSection ? (
              renderStreamSection(project.coverSection, "page-enter")
            ) : null}

            {!videoFirst ? (
              <figure
                className={`project-media-item project-cover page-enter${project.coverFit === "contain" ? " project-media-contain" : ""}`}
              >
                <Image
                  src={project.cover}
                  alt={project.coverAlt}
                  width={project.coverWidth ?? 1400}
                  height={project.coverHeight ?? 788}
                  sizes="(max-width: 767px) 100vw, 68vw"
                  priority
                />
              </figure>
            ) : null}

            {!videoFirst ? projectVideo : null}

            {standardGallery.map((media, index) => {
              const previousSection = index === 0
                ? project.coverSection
                : standardGallery[index - 1]?.section;
              const startsSection = Boolean(
                media.section && media.section !== previousSection,
              );
              const sectionLabel = startsSection && media.section
                ? renderStreamSection(media.section, "reveal")
                : null;

              if (media.group === "h5-game") {
                const isFirstGameScreen = standardGallery.findIndex(
                  (item) => item.group === "h5-game",
                ) === index;

                if (!isFirstGameScreen) return null;

                const gameScreens = standardGallery.filter(
                  (item) => item.group === "h5-game",
                );

                return (
                  <Fragment key="h5-game">
                    {sectionLabel}
                    <section className="project-media-group reveal">
                      {project.mediaGroupLabels?.h5Game ? (
                        <h3 className="project-media-group-label">
                          {project.mediaGroupLabels.h5Game}
                        </h3>
                      ) : null}
                      <div
                        className="project-media-quad"
                        aria-label="Fanta and Bilibili H5 game screens"
                      >
                        {gameScreens.map((screen) => (
                          <figure className="project-media-item" key={screen.src}>
                            <Image
                              src={screen.src}
                              alt={screen.alt}
                              width={screen.width ?? 346}
                              height={screen.height ?? 748}
                              sizes="(max-width: 767px) 42vw, 17vw"
                            />
                          </figure>
                        ))}
                      </div>
                    </section>
                  </Fragment>
                );
              }

              if (media.group === "video-pair") {
                const isFirstVideo = standardGallery.findIndex(
                  (item) => item.group === "video-pair",
                ) === index;

                if (!isFirstVideo) return null;

                const videos = standardGallery.filter(
                  (item) => item.group === "video-pair",
                );

                return (
                  <Fragment key="video-pair">
                    {sectionLabel}
                    <div className="project-media-video-pair reveal">
                      {videos.map((video) => (
                        <figure className="project-video-tile" key={video.src}>
                          <div className="project-media-item project-media-portrait-video">
                            <video
                              aria-label={video.alt}
                              controls
                              muted
                              playsInline
                              poster={video.poster}
                              preload="metadata"
                            >
                              <source src={video.src} type="video/mp4" />
                            </video>
                          </div>
                          <figcaption>{video.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </Fragment>
                );
              }

              if (media.kind === "video") {
                return (
                  <Fragment key={media.src}>
                    {sectionLabel}
                    <figure className="project-video-tile project-video-tile-wide reveal">
                      <div className="project-media-item project-media-wide-video">
                        <video
                          aria-label={media.alt}
                          controls
                          muted
                          playsInline
                          poster={media.poster}
                          preload="metadata"
                        >
                          <source src={media.src} type="video/mp4" />
                        </video>
                      </div>
                      <figcaption>{media.caption}</figcaption>
                    </figure>
                  </Fragment>
                );
              }

              return (
                <Fragment key={media.src}>
                  {sectionLabel}
                  <figure
                    className={`project-media-item reveal${media.fit === "contain" ? " project-media-contain" : ""}`}
                  >
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={media.width ?? 1400}
                      height={media.height ?? 788}
                      sizes="(max-width: 767px) 100vw, 68vw"
                    />
                  </figure>
                </Fragment>
              );
            })}

            {pitchSketches.length ? (
              <figure className="project-media-item project-media-composite reveal">
                {pitchSketches.map((media) => (
                  <span className="project-media-composite-frame" key={media.src}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={940}
                      height={1062}
                      sizes="(max-width: 767px) 50vw, 34vw"
                    />
                  </span>
                ))}
              </figure>
            ) : null}

            {posterFeature ? (
              <section className="project-poster-intro reveal">
                <figure className="project-media-item project-poster-square">
                  <Image
                    src={posterFeature.src}
                    alt={posterFeature.alt}
                    width={1052}
                    height={1048}
                    sizes="(max-width: 767px) 100vw, 38vw"
                  />
                </figure>
                <div className="project-poster-copy">
                  <p>Upper South Corner</p>
                  {project.posterNote ? (
                    <p>{project.posterNote}</p>
                  ) : (
                    <>
                      <h2>A journey shaped by place, flavour and atmosphere.</h2>
                      <p>
                        The campaign turns a restaurant visit into a sequence of regional impressions, using landscape, colour and small gestures to connect every touchpoint.
                      </p>
                    </>
                  )}
                </div>
              </section>
            ) : null}

            {posterSeries.length ? (
              <div className="project-poster-triptych reveal">
                {posterSeries.map((media) => (
                  <figure className="project-media-item" key={media.src}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={1500}
                      height={2250}
                      sizes="(max-width: 767px) 72vw, 22vw"
                    />
                  </figure>
                ))}
              </div>
            ) : null}

            {project.closingSection ? (
              <>
                <section className="project-stream-copy-section reveal">
                  <h2>{project.closingSection.title}</h2>
                  {project.closingSection.description ? (
                    <p>{project.closingSection.description}</p>
                  ) : null}
                </section>
                {project.closingSection.video ? (
                  <figure className="project-media-item project-media-video project-closing-video reveal">
                    <video
                      aria-label={project.closingSection.video.label}
                      controls
                      muted
                      playsInline
                      poster={project.closingSection.video.poster}
                      preload="metadata"
                    >
                      <source
                        src={project.closingSection.video.src}
                        type="video/mp4"
                      />
                    </video>
                  </figure>
                ) : null}
              </>
            ) : null}

            <a
              className="next-project project-adjacent-link reveal"
              href={`/work/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
            >
              <span
                className={`project-adjacent-thumbnail${nextProject.coverFit === "contain" ? " project-adjacent-thumbnail-contain" : ""}`}
              >
                <Image
                  src={nextProject.cover}
                  alt=""
                  width={nextProject.coverWidth ?? 1400}
                  height={nextProject.coverHeight ?? 788}
                  sizes="(max-width: 767px) 34vw, 15vw"
                />
              </span>
              <span className="project-adjacent-copy">
                <span className="project-adjacent-label">Next project</span>
                <strong>{nextProject.shortTitle}</strong>
              </span>
            </a>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
